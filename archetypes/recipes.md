---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
tags: []
source: original
date: {{ .Date | time.Format "2006-01-02" }}
draft: false
---
