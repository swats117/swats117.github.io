# -*- coding: utf-8 -*-

from urllib.request import urlopen

from bs4 import BeautifulSoup
#insert URL of google scholar page of a specific author 
quote_page = "https://scholar.google.com/citations?user=_EPCKe0AAAAJ&hl=en"
page = urlopen(quote_page)
soup = BeautifulSoup(page, "html.parser")



#find the paper
paper = soup.find_all("a", attrs={"class": "gsc_a_at"})

#find the citations 
citations = soup.find_all("a", attrs={"class":"gsc_a_ac gs_ibl"})

#find total citations, h-index and i10 index 
total = soup.find_all("td", attrs={"class":"gsc_rsb_std"})


#find the co-authors of the main author from the first page 
divs = soup.find_all("div", attrs={"class": "gs_gray"})



###############################################################PAPER###########################################################
for pap in paper:
	#print (pap.text.strip())
	with open('Josh_Cogan_paper.txt','a') as the_file:
		the_file.write(pap.text.strip()+"\n")


###############################################################CITATIONS#######################################################

for cit in citations:
	#print (cit.text.strip())
	with open('Josh_Cogan_citations.txt','a') as the_file:
		the_file.write(cit.text.strip()+"\n")
###############################################################TOTAL STATS#######################################################
for tot in total:
	#print (tot.text.strip())
	with open('Josh_Cogan_total.txt','a') as the_file:
		the_file.write(tot.text.strip()+"\n")

###############################################################COAUTHOR########################################################
for div in divs:
    #print (div.text.strip())
    with open('Josh_Cogan.txt', 'a') as the_file:
    	the_file.write(div.text.strip()+"\n")

fp1 = open('Josh_Cogan_author.txt', 'w+')

with open('Josh_Cogan.txt') as fp:
	line1 = fp.readline()
	line2 = fp.readline()
	while line1 and line2:
		fp1.write(line1+"\n")
		line1 = fp.readline()
		line2 = fp.readline()









