package controller;

import js.node.http.IncomingMessage;
import js.node.http.ServerResponse;
import haxe.http.HttpStatus;
import js.node.Fs;

class ScriptController {

    var im : IncomingMessage;
    var sr : ServerResponse;
    
    public function new(im : IncomingMessage, sr : ServerResponse) {
		this.im = im;
		this.sr = sr;
		this.sr.setHeader("Content-Type", "application/javascript");
		var requestedFileUrl = '.' + this.im.url;
			Fs.readFile(requestedFileUrl, function(err, data) {
				if (err != null) {
					this.sr.writeHead(404);
					this.sr.write("ressource not found");
				} else {
					this.sr.writeHead(200);
					this.sr.write(data);
				}

				this.sr.end();
			});
	}
}