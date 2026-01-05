# MIS233-final-project

Author: Alyaa Al-Rubaye  
Course: MIS 233  

## Description
Custom Grafana panel plugin built for the MIS233 final project.  
The plugin loads correctly in Grafana, displays the author name, and renders real query data with simple interactivity.

## Features
- Custom Grafana panel plugin
- Editable panel title
- Author name toggle and text
- Displays series and field counts
- Shows last numeric values and simple trend
- “Show details” interactivity
- Responsive to panel size

## Requirements
- Grafana OSS (local installation)
- Node.js 18 or 20
- npm

## Build
    npm install
    npm run build

## Install
Copy the contents of `dist/` into:

    C:\Program Files\GrafanaLabs\grafana\data\plugins\asrubaye-mis233final-panel

Allow unsigned plugin by editing or creating:

    C:\Program Files\GrafanaLabs\grafana\conf\custom.ini

Add:

    [plugins]
    allow_loading_unsigned_plugins = asrubaye-mis233final-panel

Restart Grafana.

## Usage
Open Grafana → New Dashboard → Add visualization → MIS233 Final Panel  
Add a query (TestData works) and use panel options.

## Demo
A short demo video and screenshot are included showing the plugin working in Grafana.

