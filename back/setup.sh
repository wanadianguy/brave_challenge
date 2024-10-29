# Creates venv for dependencies
echo Creating python venv
python3 -m venv ./.venv
echo Starting python venv
source .venv/bin/activate
echo Installing packages
python3 -m pip install -r requirements.txt

# Displays the environments's path that is in use (the result should be the path of a local .venv directory)
echo $VIRTUAL_ENV

# Starts server
python3 api.py

# Cleans up when server stops
echo cleaning up
deactivate
