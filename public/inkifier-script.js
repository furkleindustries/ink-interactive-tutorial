/* eslint-disable */
/* From https://github.com/y-lohse/inkjs/blob/5d2f2fd180cc0ede9360425ab33f11258b0006f1/templates/browser_serverless/main.js. */
(function (storyContent) {
  var inkjs = window.inkjs;
  if (window !== top) {
    inkjs = top.inkjs;
  }

  var story = new inkjs.Story(storyContent);
  var storyContainer = document.body;

  function showAfter(delay, el) {
    setTimeout(function() {
      el.classList.add('show');
    }, delay);
  }

  function scrollToBottom() {
    var start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var dist = document.body.scrollHeight - window.innerHeight - start;
    if (dist < 0) {
      return;
    }

    var duration = 300 * dist / 100 + 300;
    var startTime = null;
    function step(time) {
      if (startTime === null) {
        startTime = time;
      }

      var t = (time - startTime) / duration;
      var lerp = 3 * t * t - 2 * t * t * t;
      window.scrollTo(0, start + lerp * dist);
      if (t < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function continueStory() {
    var delay = 0;

    // Generate story text - loop through available content
    while (story.canContinue) {
      // Get ink to generate the next paragraph
      var paragraphText = story.Continue();

      // Create paragraph element
      var paragraphElement = document.createElement('p');
      paragraphElement.innerHTML = paragraphText;
      storyContainer.appendChild(paragraphElement);

      // Fade in paragraph after a short delay
      showAfter(delay, paragraphElement);

      delay += 200;
    }

    // Create HTML choices from ink choices
    story.currentChoices.forEach(function (choice) {
      // Create paragraph with anchor element
      var choiceParagraphElement = document.createElement('p');
      choiceParagraphElement.classList.add('choice');
      choiceParagraphElement.innerHTML = '<a href="#">' + choice.text + '</a>';
      storyContainer.appendChild(choiceParagraphElement);

      // Fade choice in after a short delay
      showAfter(delay, choiceParagraphElement);
      delay += 200;

      // Click on choice
      var choiceAnchorEl = choiceParagraphElement.querySelectorAll('a')[0];
      choiceAnchorEl.addEventListener('click', function (e) {
        // Don't follow <a> link
        e.preventDefault();

        // Remove all existing choices
        var existingChoices = storyContainer.querySelectorAll('p.choice');
        for (var ii = 0; ii < existingChoices.length; ii += 1) {
          existingChoices[ii].parentNode.removeChild(existingChoices[ii]);
        }

        // Tell the story where to go next
        story.ChooseChoiceIndex(choice.index);

        // Aaand loop
        continueStory();
      });
    });

    scrollToBottom();
  }

  continueStory();
})(storyContent);
