import TelemetryReporter from 'vscode-extension-telemetry';
import vscode = require('vscode');

export var reporter: TelemetryReporter;

export class Reporter extends vscode.Disposable {
    //private toDispose: vscode.Disposable[] = [];

    constructor(ctx: vscode.ExtensionContext) {

        //super(() => this.toDispose.forEach((d) => d && d.dispose()));
        super(() => reporter.dispose());

        let packageInfo = getPackageInfo(ctx);
        reporter = packageInfo && new TelemetryReporter(packageInfo.name, packageInfo.version, packageInfo.aiKey);

    }
}

interface IPackageInfo {
    name: string;
    version: string;
    aiKey: string;
}

function getPackageInfo(context: vscode.ExtensionContext): IPackageInfo {
    let extensionPackage = require(context.asAbsolutePath('./package.json'));
    if (extensionPackage) {
        return {
            name: extensionPackage.name,
            version: extensionPackage.version,
            aiKey: extensionPackage.aiKey
        };
    }
    return null;
}