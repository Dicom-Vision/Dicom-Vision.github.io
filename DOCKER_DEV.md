# Running the Site Locally

This site is a Jekyll-based project. Since it relies on specific Ruby dependencies, we use **Docker** to run it locally without polluting your system.

## Prerequisite
- Docker must be installed and running in your WSL environment.

## Running the Server
To start the local development server, run the following command in your terminal:

```bash
wsl bash -c "docker run --rm -v /home/daniele/projects/Dicom-Vision.github.io:/srv/jekyll -p 4000:4000 jekyll/jekyll:latest jekyll serve --host 0.0.0.0 --watch --force_polling"
```

## Accessing the Site
Once the server is running, the site is available at:
- [http://localhost:4000](http://localhost:4000)

If `localhost` fails to respond (e.g., in some WSL configurations), try the direct WSL IP:
- [http://172.19.112.35:4000](http://172.19.112.35:4000)

## Troubleshooting
If you get an **ERR_EMPTY_RESPONSE**:
1. Verify that the Docker container is running: `wsl docker ps`
2. Check the logs for build errors: `wsl docker logs $(wsl docker ps -q --filter 'publish=4000')`
3. Ensure no other process is using port 4000.

## Stopping the Server
To stop the server, press `Ctrl+C` in the terminal where it's running, or run:
```bash
wsl docker ps -q --filter "publish=4000" | xargs -r wsl docker stop
```
