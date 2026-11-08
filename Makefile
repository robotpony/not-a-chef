ifeq ($(wildcard themes/fugu/hugo.toml),)
$(error the theme submodules are missing; run 'git submodule update --init')
endif

.PHONY: build check dry-run preview deploy publish drafts glossary-candidates glossary-link glossary-check glossary-apply

build:
	tools/publish.sh build

check:
	tools/publish.sh check

# Builds HEAD clean and shows what rsync would change; deploys nothing.
dry-run:
	tools/publish.sh dry-run

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
# Sections Fugu moves into the recipe sidebar are read last, so a term's one
# link lands in the main column when it can. Both are read from the merged
# config (tools/fugu-headings.py), so a site override counts; an empty list
# stops the run.
NOT_INGREDIENTS = $(or $(shell tools/fugu-headings.py not-ingredients),$(error couldn't read Fugu's not-ingredients headings))
SIDEBAR_HEADINGS = $(or $(shell tools/fugu-headings.py sidebar),$(error couldn't read Fugu's sidebar headings))
GLOSSARY_ARGS = content --glossary reference/glossary --recipes recipes --recipes drinks --not-ingredients "$(NOT_INGREDIENTS)" --sidebar-headings "$(SIDEBAR_HEADINGS)"

glossary-candidates:
	$(GLOSSARY) candidates $(GLOSSARY_ARGS)

# ENTRY="Deglaze" limits a run to one term (not TERM, the shell's terminal type); JSON=1 makes the check machine-readable.
GLOSSARY_TERM = $(if $(ENTRY),--term "$(ENTRY)")
GLOSSARY_JSON = $(if $(JSON),--json)

glossary-link:
	$(GLOSSARY) link $(GLOSSARY_ARGS) --skip tools/glossary-skip.txt $(GLOSSARY_TERM)

glossary-check:
	$(GLOSSARY) link $(GLOSSARY_ARGS) --skip tools/glossary-skip.txt --check $(GLOSSARY_TERM) $(GLOSSARY_JSON)

# ANSWERS=file.json: a check's items, each with "answer": yes, never or skip (/glossary-link).
glossary-apply:
	@test -n "$(ANSWERS)" || { echo "usage: make glossary-apply ANSWERS=file.json" >&2; exit 1; }
	$(GLOSSARY) link $(GLOSSARY_ARGS) --skip tools/glossary-skip.txt --apply "$(ANSWERS)"
