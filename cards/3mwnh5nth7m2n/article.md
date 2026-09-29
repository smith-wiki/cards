# Bound each request and the whole public service

This is a proposed cost-control design, not a tested limiter or a guaranteed billing ceiling.

[OWASP API4: Unrestricted Resource Consumption](https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/) recommends request-rate controls, execution and payload limits, and limits or alerts for spending on third-party services. Those are separate controls rather than substitutes for one another.

For this application I propose limiting admission by guest session and IP, with one active generation per conversation initially. Bound accepted text, model context, output, tool results, model rounds, tool invocations, retries, and execution time. Add a service-wide concurrency cap and a spending cutoff. Tune actual values against real requests rather than treating example defaults as capacity evidence.

## Why counting messages is not enough

In an agent, one accepted message can cause several model and tool calls. Even a low request count can therefore consume more than intended. A long conversation can also make later requests more expensive than earlier ones.

My proposed admission invariant is:

`recorded usage + outstanding reservations + new reservation <= configured budget`

Check and reserve atomically in a shared store before admitting paid work. Reserve a conservative bound for a bounded run, or gate each paid step with its own reservation. Reconcile against observed usage afterward. Include paid tools, not only model tokens. Retain conservative accounting when cancellation or a network failure leaves final usage unknown rather than immediately assuming the request cost nothing.

This is an application policy, not a promise of exact provider billing. Its reliability depends on sound bounds, complete cost accounting, and the behavior of already-started upstream work. The public route should refuse additional work when it cannot safely determine available capacity.

Multiple replicas must share the admission and accounting state. Independent in-memory counters would implement independent limits rather than one global cap.

## Guest identity limits

A visitor can create another guest session. Thus a session cookie cannot enforce one daily allowance per human. IP checks and challenges can add friction but do not establish a unique identity. Keep a global safety limit even when per-session controls appear sufficient.

Protect session creation itself from abuse and avoid interpreting an IP address as a reliable individual identity. No chosen rate, budget, or anti-bot configuration has been tested in this investigation.
