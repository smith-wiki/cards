For a UTM window that you want to move while recording, use OBS to capture the window and crop the captured source.

1. Add a macOS Screen Capture source. In its properties, set Method to Window Capture and select the VM window.
2. Select that source in the OBS preview. Hold Option and drag its edge handles inward until only the guest display remains. Remove UTM's title bar, toolbar and any unwanted borders. Alternatively, press Command+E to open Edit Transform and enter the crop values numerically.
3. Size and position the cropped image on the OBS canvas. Match the canvas aspect ratio to the guest display if you want a video without unused margins.
4. Start recording. You can move the UTM window on the host desktop.

The key relationship is that OBS captures a selected window, while its crop acts on the captured source. From those documented behaviors, the crop stays relative to the window when you move it; it is not tied to a fixed rectangle on the host desktop. I have not performed a UTM recording test here.

Keep the VM window size and display scaling stable during the recording. If you resize the window, change display scaling or show a toolbar that was previously hidden, check the crop again. Moving the window alone does not require changing the crop.

This refines the earlier answer: a fixed selected screen region does not meet the requirement to move the UTM window.

Sources checked on October 3, 2026:

- [OBS: macOS Screen Capture Source](https://obsproject.com/kb/macos-screen-capture-source)
- [OBS: Sources Guide, including cropping and Edit Transform](https://obsproject.com/kb/sources-guide)
- [OBS: Crop/Pad Filter, an alternative for cropping source edges](https://obsproject.com/kb/crop-pad-filter)
