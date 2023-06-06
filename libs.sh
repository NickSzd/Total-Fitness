# Bash Script to Install Libraries 

# YOU MAY NEED to RUN AS SUPER USER

# When You add a new Library to the App create a  new Item in the list
# WHen Pulling From Main run
# bash ./libs.sh
# This will reinstall npm along with the lates libraries
#!/bin/bash 

#!/bin/bash 
libraries=(
    "--save react-swipeable-views --force"
)

echo $(npm install)

for i in ${!libraries[@]}; do
  echo $(npm install) + ${libraries[$i]}
done
