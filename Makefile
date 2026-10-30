.PHONY: build preview deploy publish drafts glossary-candidates glossary-link glossary-check

build:
	tools/publish.sh build

preview:
	tools/preview.sh

deploy: publish

publish:
	tools/publish.sh

drafts:
	python3 themes/fugu/tools/drafts.py

# Glossary tools (hugo-warped glossary/README.md), from the pinned submodule.
GLOSSARY = python3 themes/hugo-warped/tools/glossary.py
# Ingredient lists in recipes and drinks are never linked; the heading words
# that mark a section as not ingredients come from Fugu's params, one source.
NOT_INGREDIENTS := $(shell sed -n 's/^ *notIngredients *= *\[\(.*\)\]/\1/p' themes/fugu/hugo.toml | tr -d '" ')
GLOSSARY_ARGS = content --glossary reference/glossary --recipes recipes --recipes drinks --not-ingredients $(NOT_INGREDIENTS)

glossary-candidates:
	$(GLOSSARY) candidates $(GLOSSARY_ARGS)

glossary-link:
	$(GLOSSARY) link $(GLOSSARY_ARGS) --skip tools/glossary-skip.txt

glossary-check:
	$(GLOSSARY) link $(GLOSSARY_ARGS) --skip tools/glossary-skip.txt --check
