var GitHub = {
	size : 0,
	links : new Array()
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
			var $githubLinks = $(
					'<a href="' + link.url + '" title="' + link.description
							+ '">' + link.name + '</a>').hide();
			$githubLinks.appendTo($(selector)).slideDown();
		}
	});
};

GitHub.setup = function() {
	GitHub.setupPublicRepoList();
};

GitHub.setupPublicRepoList = function() {
	var url = "https://api.github.com/users/guinto/repos";
	GitHub.getReadme("TrentEDesign");
	$.ajax({
		url : url,
		dataType : "jsonp",
		success : function(response) {
			var data = response.data;
			console.log(data);
			for ( var i = 0; i < data.length; i++) {
				GitHub.links.push(new Project(data[i]));
			}
			// Put the most recent first
			GitHub.links.reverse();
			
			GitHub.getReadme("TrentEDesign");
		}
	});
};

GitHub.getReadme = function(repoID) {
	$.get(repoID + "README.md", function(data) {
		$.ajax({
			url : "http://documentup.com/compiled",
			dataType : "jsonp",
			data : {
				content : data,
				name : repoID
			},
			success : function(resp) {
				$('#projectTrentEDesign .js-replace').append(resp.html);
				$('#projectTrentEDesign .js-replace').replaceWith($('#content').removeAttr('id'));
			}
		});
	});
}

GitHub.getReadme2 = function(repoID) {
	$.get("README.md", function(data) {
		console.log(data);
	});

	//var url = "https://api.github.com/repos/guinto/" + repoID + "/readme";
	$.ajax({
		url : url,
		dataType : "jsonp",
		data : {
			"Accept" : "application/vnd.github.beta.raw+json"
		},
		success : function(response) {
			var data = response.data;
			console.log(data);
			/*$.ajax({
				url : "http://documentup.com/compiled",
				dataType : "jsonp",
				data : {
					content : README.md,
					name : "TrentEDesign"
				},
				success : function(resp) {
					// `status` is always provided
					if (resp.status == 200) {
						// Write to your document
						document.open();
						document.write(resp.html);
						document.close();
					}
				}
			});*/
		}
	});
};