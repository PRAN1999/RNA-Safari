//
//  SafariExtensionViewController.swift
//  RNA Extension
//
//  Created by Pranay Neelagiri on 11/26/18.
//  Copyright © 2018 Pranay Neelagiri. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
