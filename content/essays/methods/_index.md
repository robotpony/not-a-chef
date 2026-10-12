---
title: Methods
# This folder is its own section so methods stay out of the essays list
# (docs/METHODS.md). The section page isn't rendered: the methods list is
# the `method` tag's page (content/tags/method/_index.md), which takes
# over /essays/methods/ as an alias, so the breadcrumb on a method page
# still lands there.
build:
  render: link
  list: never
# Everything in this folder is a method. This tags a method page that
# has no tags of its own; a page that sets `tags` replaces it, so list
# `method` there yourself (/lint checks).
cascade:
  - tags: [method]
---
