var GitHub = {
	size: 0,
	links: new Array()
};

function Project(gitObj) {
	this.id = GitHub.size++;
	this.url = gitObj.html_url;
	this.name = gitObj.name;
	this.description = gitObj.description;
	this.lastUpdated = gitObj.pushed_at;
};

GitHub.addRecentProjectsToSelector = function(selector) {
	$.each(GitHub.links, function(index, link) {
		var prevMonth = new Date();
		prevMonth.setMonth(prevMonth.getMonth() - 1);
		
		var recent = (new Date(link.lastUpdated) > prevMonth);
		if (recent) {
			var $githubLinks = $('<a href="' + link.url + '" title="' + link.description + '">' + link.name + '</a>').hide();
			$githubLinks.appendTo($(selector)).slideDown();
		}
	});
};

GitHub.setup = function() {
	GitHub.setupPublicRepoList();
};

GitHub.setupPublicRepoList = function() {
	var url = "https://api.github.com/users/guinto/repos";
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function(response) {
			var data = response.data;
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				GitHub.links.push(new Project(data[i]));
				GitHub.getReadme(data[i].id);
			}
		}
	});
};

GitHub.getReadme = function(repoID) {
	var url = "https://api.github.com/repos/guinto/" + repoID + "/readme";
	console.log(url);
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function(response) {
			var data = response.data; 
			console.log(data);
		}
	});
};