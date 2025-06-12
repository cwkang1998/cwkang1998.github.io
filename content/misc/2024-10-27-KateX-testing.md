+++
title = "KateX testing"
date = 2024-10-24
+++

This is just a simple post to test out Katex rendering.

For an inline KaTeX render do `{{/* katex(body="\KaTeX") */}}`, you should get something like this.

{{ katex(body="\KaTeX") }}

For a block KateX render do `{%/* katex(block=true) */%} \KaTeX {%/* end */%}` which should render a block like this.

{% katex(block=true) %}
\KaTeX
{% end %}

Do not attempt to render short code inside a code block, it does not go well.