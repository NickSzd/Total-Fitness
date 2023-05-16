# Bash Script to Install Libraries 

# YOU MAY NEED to RUN AS SUPER USER

# When You add a new Library to the App create a  new Item in the list
# WHen Pulling From Main run
# bash ./libs.sh
# This will reinstall npm along with the lates libraries
#!/bin/bash 

#!/bin/bash 
libraries=(
    "@devexpress/dx-react-chart-material-ui@4.0.3"
    "@devexpress/dx-react-chart@4.0.3"
    "@devexpress/dx-react-core@4.0.3"
    "@emotion/react@11.10.6"
    "@emotion/styled@11.10.6"
    "@fontsource/roboto@4.5.8"
    "@mui/icons-material@5.11.16"
    "@mui/joy@5.0.0-alpha.76"
    "@mui/material@5.12.0"
    "@mui/styled-engine-sc@5.12.0"
    "@mui/x-date-pickers@6.2.1"
    "@nivo/pie@0.80.0"
    "@testing-library/jest-dom@5.16.5"
    "@testing-library/react@13.4.0"
    "@testing-library/user-event@13.5.0"
    "dayjs@1.11.7"
    "dayz@2.9.1"
    "firebase@9.20.0"
    "firebaseui@6.0.2"
    "moment@2.29.4"
    "mui@0.0.1"
    "react-dom@18.2.0"
    "react-draggable@4.4.5"
    "react-dropzone@14.2.3"
    "react-router-dom@6.10.0"
    "react-scripts@5.0.1"
    "react@18.2.0"
    "recharts@2.5.0"
    "styled-components@5.3.9"
    "web-vitals@2.1.4"
    "webpack-cli@5.0.2"
)

echo $(npm install)

for i in ${!libraries[@]}; do
  echo $(npm install) + ${libraries[$i]}
done
