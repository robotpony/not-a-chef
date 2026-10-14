# /preview

Start the Hugo development server and open it in the browser.

Run: tools/preview.sh

The script stops any hugo server already on port 1313 and starts a fresh one, so the preview always reflects the current theme and config. Run it in the background; don't skip it because a server is already up.

Includes draft content (-D) and opens http://localhost:1313/ once the server responds. Report the local URL when the server starts.
