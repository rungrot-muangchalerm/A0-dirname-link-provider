import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const provider = new DirnameLinkProvider();

  const disposable = vscode.languages.registerDocumentLinkProvider(
    [
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'javascriptreact' },
      { scheme: 'file', language: 'typescriptreact' },
    ],
    provider
  );

  context.subscriptions.push(disposable);
}

class DirnameLinkProvider implements vscode.DocumentLinkProvider {
  // Patterns to match:
  // __dirname + '/../../something.js'
  // __dirname + "../../something.js"
  // path.join(__dirname, '/../../something.js')
  // path.resolve(__dirname, '/../../something.js')
  // path.join(__dirname, "../../something.js")
  private patterns = [
    // __dirname + '/path' or __dirname + `/path` (template literal without ${})
    /__dirname\s*\+\s*['"`]([^'"`]*?)['"`]/g,
    // path.join(__dirname, '/path')
    /path\.join\s*\(\s*__dirname\s*,\s*['"`]([^'"`]*?)['"`]/g,
    // path.resolve(__dirname, '/path')
    /path\.resolve\s*\(\s*__dirname\s*,\s*['"`]([^'"`]*?)['"`]/g,
  ];

  provideDocumentLinks(
    document: vscode.TextDocument
  ): vscode.DocumentLink[] {
    const links: vscode.DocumentLink[] = [];
    const text = document.getText();
    const baseDir = path.dirname(document.uri.fsPath);

    for (const pattern of this.patterns) {
      let match: RegExpExecArray | null;
      // Reset regex lastIndex
      pattern.lastIndex = 0;

      while ((match = pattern.exec(text)) !== null) {
        const relativePath = match[1];
        const fullMatch = match[0];
        const startIndex = match.index;

        // Find the position of the path string inside the match
        const pathStartInMatch = fullMatch.indexOf(relativePath);
        if (pathStartInMatch === -1) continue;

        const pathStart = startIndex + pathStartInMatch;
        const pathEnd = pathStart + relativePath.length;

        const startPos = document.positionAt(pathStart);
        const endPos = document.positionAt(pathEnd);
        const range = new vscode.Range(startPos, endPos);

        // Resolve absolute path
        let resolvedPath: string;
        if (path.isAbsolute(relativePath)) {
          resolvedPath = relativePath;
        } else {
          resolvedPath = path.resolve(baseDir, relativePath);
        }

        const link = new vscode.DocumentLink(range, vscode.Uri.file(resolvedPath));
        link.tooltip = `Go to ${resolvedPath}`;
        links.push(link);
      }
    }

    return links;
  }
}

export function deactivate() {}
