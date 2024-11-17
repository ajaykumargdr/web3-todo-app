#!/bin/bash

rm -rf ./ignition/deployments ./artifacts ./cache

hh node &
sleep 1
hh ignition deploy ./ignition/modules/ToDoList.js --network localhost

wait