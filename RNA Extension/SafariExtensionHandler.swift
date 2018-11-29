//
//  SafariExtensionHandler.swift
//  RNA Extension
//
//  Created by Pranay Neelagiri on 11/26/18.
//  Copyright © 2018 Pranay Neelagiri. All rights reserved.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        // This method will be called when a content script provided by your extension calls safari.extension.dispatchMessage("message").
        print("Received Message: " + messageName)
        switch messageName {
        case DispatchConstants.INJECT:
            print("Rendering App...")
            page.dispatchMessageToScript(withName: DispatchConstants.RENDER, userInfo: userInfo)
            break
        default:
            break
        }

    }
    
    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }

}
