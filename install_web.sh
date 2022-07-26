drop=false
create=false
fill=false
inst_web=true
inst_server=true

while true; do
  case "$1" in
    -d | --drop ) drop=true; shift ;;
    -c | --create ) create=true; shift ;;
    -f | --fill ) fill=true; shift ;;
    -niw | --not_inst_web ) inst_web=false; shift ;;
    -nis | --not_inst_server) inst_server=false; shift ;;
    * ) break ;;
  esac
done
cd server
if [[ $inst_server ]]; then
  yarn
fi
if [[ $drop ]]; then
  yarn dropdb
  yarn createdb
elif [[ $create ]]; then
  yarn createdb
elif [[ $fill ]]; then
  node ./src/db/create.js
fi
if [[ $inst_web ]]; then
  cd ../webapp
  yarn
fi
cd ..
