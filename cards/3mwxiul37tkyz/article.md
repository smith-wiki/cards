You can record the display of a UTM virtual machine from the host Mac.

For a quick recording, press Shift+Command+5 on the host. Choose Record Selected Portion and frame the guest display. On macOS Tahoe 26 or later, you can instead choose Record Selected Window and select the VM window. Start recording, then use the VM normally. Stop with the menu-bar Stop button or Command+Control+Esc.

For recording with OBS, add the macOS Screen Capture source, set its Method to Window Capture, and select the VM window. This source supports audio capture on macOS 13 or later. Audio must be enabled in the recording setup. The host must have permission to record the screen.

Apple's built-in recorder can record a microphone. Its current documentation says system-audio recording is available on macOS 27 or later. On an older host, OBS is an option when you need the VM's sound.

I did not find a built-in video recorder in the UTM controls and macOS preferences documentation. Those pages describe input capture and automatic VM screenshots. Input capture means sending keyboard and mouse input to the guest; it does not mean recording video. This is a documentation finding, not a test of every UTM version.

Sources checked on October 3, 2026:

- [Apple: How to record the screen on Mac](https://support.apple.com/en-us/102618)
- [OBS: macOS Screen Capture Source](https://obsproject.com/kb/macos-screen-capture-source)
- [UTM: Controls](https://docs.getutm.app/basics/controls/)
- [UTM: macOS preferences](https://docs.getutm.app/preferences/macos/)
