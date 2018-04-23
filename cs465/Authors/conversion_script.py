import os
import json

authors_names = ["V_Vapnik", "Trevor_Hastie", "Robert_Tibshirani", 
				"Michael_I_Jordan", "Kavi_Mahesh", "Josh_Cogan", 
				"Jitendra_Malik"]

for author_name in authors_names: 

	#                 =  first letter of first name      +    last name
	authors_initials = ""
	for i in range(len(author_name.split("_"))-1):
		authors_initials = authors_initials + author_name.split("_")[i][0]

	author_paper_name =  authors_initials + " " + author_name.split("_")[len(author_name.split("_"))-1]
	author_proper_name = author_name.replace("_"," ")
	os.chdir("./"+author_name)

	# citations
	# author
	# paper
	# total

	papers = []
	citations = []
	authors_graph = []
	total = []

	with open(author_name+"_paper.txt", "r") as f:
		papers = [x.strip() for x in f.readlines()]
	with open(author_name+"_citations.txt", "r") as f:
		citations = [x.strip() for x in f.readlines()]
	with open(author_name+"_total.txt", "r") as f:
		total = [x.strip() for x in f.readlines()]
	with open(author_name+"_author.txt", "r") as f:
		lines = [x.strip()    for x in f.readlines()]
		lines = [x.split(",") for x in lines if x]
		authors_graph = [[y.strip()  for y in x ] for x in lines]
		for i in range(len(authors_graph)):
			authors_graph[i] = [y for y in authors_graph[i] if (y != '...')]

	# generate size associated with every author

	uniqueAuthors = [] 
	for _list in authors_graph :
		for author in _list :
			uniqueAuthors.append(author)
	uniqueAuthors = list(set(uniqueAuthors))
	print(uniqueAuthors)

	total_citations = {}
	for x in uniqueAuthors:
		total_citations[x] = 0
	print(total_citations)
	for i in range(len(authors_graph)):
		for author in authors_graph[i]:
			total_citations[author] += int(citations[i])
	print(total_citations)


	# get first non-primary author in every authors list
	print(total_citations.items())
	total_citations_pairs = list(reversed(sorted(total_citations.items(), key=lambda x: x[1])))
	average_number_of_citations = 0 
	for pair in total_citations_pairs:
		average_number_of_citations += pair[1] 
	average_number_of_citations /= len(total_citations_pairs)


	# take primary author out of list
	print("\n\n")
	print(authors_graph)
	print("\n\n")
	authors_graph2 = []
	for i in range(len(authors_graph)):
		authors_graph2.append([])
		for x in authors_graph[i]:
			if x != author_paper_name:
				authors_graph2[i].append(x)
	authors_graph3 = []
	for x in authors_graph2:
		if x != []:
			authors_graph3.append(x)

	print(authors_graph3)
	print("\n\n")

	# make children out of the others and associate their size
	json_children_list = []

	inc = 1
	while len(authors_graph3) > 0:
		best_connected_author = total_citations_pairs[inc][0]
		authors_lists_with_bca = []
		for i in range(len(authors_graph3)):
			for x in authors_graph3[i]:
				if x == best_connected_author:
					authors_lists_with_bca.append(i)
		children = []
		for index in authors_lists_with_bca:
			for author in authors_graph3[index]:
				if author != best_connected_author:
					children.append(author)

		children = list(set(children))
		children_dict = []
		for child in children:
			children_dict.append({"name": child ,"size": total_citations[child]})
		json_children_list.append({	"name": best_connected_author,
									"size": total_citations[best_connected_author], 
									"children": children_dict})

		authors_lists_with_bca = sorted(authors_lists_with_bca,reverse=True)
		for index in authors_lists_with_bca:
			authors_graph3.pop(index)
		inc += 1

	print(json_children_list)


	treeData = [{"name": author_proper_name, "children": json_children_list, "size": int(average_number_of_citations)}]
	print(treeData)

	with open(author_name+'.json', 'w') as write_file:
		write_file.write("function "+author_name+"(){ var treeData = ")
		json.dump(treeData, write_file, indent=2)
		write_file.write("; return treeData; }")
	
	os.chdir("..")


# while len(authors_graph2) > 0:
	


# print(authors_graph)




