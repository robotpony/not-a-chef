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
GLOSSARY_ARGS = content --glossary reference/glossary

glossary-candidates:
	$(GLOSSARY) candidates $(GLOSSARY_ARGS)

glossary-link:
	$(GLOSSARY) link $(GLOSSARY_ARGS) --skip tools/glossary-skip.txt

glossary-check:
	$(GLOSSARY) link $(GLOSSARY_ARGS) --skip tools/glossary-skip.txt --check
