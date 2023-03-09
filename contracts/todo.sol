//SPDX-License-Identifier : MIT
pragma solidity 0.8.13;

contract TodoDapp {
    uint public totalTasks = 0;
    struct Task {
        uint id;
        string name;
        bool complete;
        uint completeTime;
    }
    mapping(uint => Task) public taskList;

    function createTask(string memory taskText) public {
        taskList[totalTasks] = Task(totalTasks, taskText, false, 0);
        totalTasks++;
    }

    function completeTask(uint index) public {
        if (taskList[index].complete == false) {
            taskList[index].complete = true;
            taskList[index].completeTime = block.timestamp;
        }
    }

    function restartTask(uint index) public {
        if (taskList[index].complete == true) {
            taskList[index].complete = false;
            taskList[index].completeTime = 0;
        }
    }
}
