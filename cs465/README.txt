Our code is structured as follows:

The files named figure-x.html represent different functionalities offered on the front page. The main page of the webtool has four main search options:
1. Author
2. Title
3. Abstract 
4. See what companies are talking about 

The button customize your search lets you add filters to your search. Click on the search in that page to enable the dropdown in the home page.

For the 'Author' facility, we use d3.js that helped us build a collapsible node structure. The code for this is under the folder 'node-focusable-d3-radial'

FUTURE WORK: 
We will be adding more features to this node structure by introducing other visual features like color, radius of node and thickness of edge joining an author to a co-author to indicate various information like shared papers, citations etc.


The folder 'startbootstrap' contains most of the styling and bootstrap work.

The folder 'assets' contains the images used in the webpages. 

INDEX.HTML is the home page of the website, most of the pages have information on what they do. 


FUTURE WORK: 
For now, we have showed results with one author (available as dropdown in the search box of homepage), we will be adding several more features and profiles through different json files (under node-focusable-d3-js/js/index.js) that represent all probable author profiles and scenarios that could exist. 
