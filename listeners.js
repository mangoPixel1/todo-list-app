// Set up event listeners
function setupInputListeners() {
	// Add new task when Add button is clicked
	addBtn.addEventListener("click", addNewTask);

	// Add new task when Enter key is pressed
	textInputBox.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.keyCode === 13) {
			addNewTask();
		}
	});

	// Display options when input box has text
	textInputBox.addEventListener("input", () => {
		if (textInputBox.value.trim() !== "") {
			newTaskOptions.style.display = "block";
		} else {
			newTaskOptions.style.display = "none";
		}
	});

	// Hide options and clear button when the clear button is clicked
	clearBtn.addEventListener("click", () => {
		newTaskOptions.style.display = "none";
		clearBtn.style.display = "none";

		// Clear the input fields
		textInputBox.value = "";
		document.getElementById("low-priority").checked = false;
		document.getElementById("medium-priority").checked = false;
		document.getElementById("high-priority").checked = false;
		document.getElementById("taskDescriptionInput").value = "";
		document.getElementById("tagsInput").value = "";
		currentTags.length = 0;
	});

	// Show clear button when needed (e.g., when input box has text)
	textInputBox.addEventListener("input", () => {
		if (textInputBox.value.trim() !== "") {
			clearBtn.style.display = "flex";
		} else {
			clearBtn.style.display = "none";
		}
	});

	// Update character count and display red border when input exceeds character limit
	const currentCount = document.querySelector(".current-count"); // Character count element
	taskDescriptionInput.addEventListener("input", () => {
		const count = taskDescriptionInput.value.length;
		currentCount.textContent = count;

		if (count > 200) {
			taskDescriptionInput.classList.add("max-length");
			currentCount.classList.add("max-length");
		} else {
			taskDescriptionInput.classList.remove("max-length");
			currentCount.classList.remove("max-length");
		}
	});

	// Add a new tag when add tag button is clicked
	addTagBtn.addEventListener("click", addNewTag);

	// Add a new tag when Enter key is pressed
	tagsInput.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.keyCode === 13) {
			addNewTag();
		}
	});
}
function setupToolbarListeners() {
	// Event listener for the "Expand All" button
	expandAllBtn.addEventListener("click", () => {
		tasks.forEach(task => {
			task.isExpanded = true;
		});
		renderTasks();
	});

	// Event listener for the "Collapse All" button
	collapseAllBtn.addEventListener("click", () => {
		tasks.forEach(task => {
			task.isExpanded = false;
		});
		renderTasks();
	});

	// Add event listener to the filter dropdown
	filterDropdown.addEventListener("change", () => {
		const selectedPriority = filterDropdown.value;
		filterTasksByPriority(selectedPriority);
	});

	// Add event listener to the reset button
	resetButton.addEventListener("click", () => {
		filterDropdown.value = "";
		filteredTasks.length = 0;
		tasks.forEach(task => {
			task.isExpanded = false;
		});
		renderTasks();
	});

	// Get the search input and button elements
	const searchInput = document.getElementById("search-input");
	const searchBtn = document.getElementById("search-btn");
}
function setupStorageListeners() {
	// Save data to browser storage when user navigates away from page
	window.addEventListener("beforeunload", () => {
		localStorage.setItem("tasksArr", JSON.stringify(tasks));
	});
}

// Call the setup functions
setupInputListeners();
setupToolbarListeners();
setupStorageListeners();