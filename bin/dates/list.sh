for i in db/*/index.yaml
do
	echo "$i:" $(git log --diff-filter=A --follow --format=%aI -1 -- $i)
done
