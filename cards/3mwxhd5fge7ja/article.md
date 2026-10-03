Set the tag column in your Emacs configuration:

```elisp
(setq org-tags-column 100)
```

For a quick change in the current buffer, press `M-:` and evaluate:

```elisp
(setq-local org-tags-column 100)
```

Then press `C-u C-c C-q` to realign all tags in the buffer. Choose a larger column if necessary. This controls alignment to a column rather than a fixed number of spaces after each heading.

Source: [Org manual: Setting Tags](https://orgmode.org/manual/Setting-Tags.html).
