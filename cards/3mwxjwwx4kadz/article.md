Try placing a blank margin outside the virtual display, inside the UTM host window. This would keep the guest's complete rectangular screen away from the host window's rounded bottom corners, without reserving space through the guest's Dock or window manager.

This is a proposed workaround to test, not a confirmed UTM recording result.

1. Shut down the VM normally. Open its UTM configuration and select Display.
2. Disable Dynamic Resolution and select a fixed display size, for example 1920 x 1080. UTM documents these dimensions in points; HiDPI can increase the actual pixel dimensions.
3. Start the VM. Try increasing only the height of its host window, keeping the virtual display's aspect ratio unchanged.
4. If the display remains a complete rectangle with blank margins above and below it, make the bottom margin tall enough that the rounded host-window corners no longer reach the virtual display.
5. In OBS Window Capture, crop the host toolbar and the blank margins. The recorded image should then consist of the complete rectangular guest display. Moving the host window preserves this geometry.

The fixed-resolution controls are documented. The installed UTM version's window constraints and its display fitting behavior still need checking. If UTM keeps the host window locked to the display's aspect ratio, or stretches the display to fill it, this method will not create the required margin. Disabling Dynamic Resolution alone does not establish that the margin exists.

Cropping a strip directly from an edge-to-edge guest display would also remove any guest content in that strip. The proposed margin must be outside the guest display for this workaround to preserve all guest pixels.

Sources checked on October 3, 2026:

- [UTM: Apple-backend Display settings, including fixed resolution and Dynamic Resolution](https://docs.getutm.app/settings-apple/devices/display/)
- [Apple WWDC23: Create seamless experiences with Virtualization, explaining fixed and resizable displays](https://developer.apple.com/videos/play/wwdc2023/10007/)
- [OBS: Sources Guide, including cropping](https://obsproject.com/kb/sources-guide)
- [UTM issue #7662: Host-window rounding clips guest pixels](https://github.com/utmapp/UTM/issues/7662)
