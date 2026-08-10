from html.parser import HTMLParser


class _DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title = ""
        self.paragraphs: list[str] = []
        self._tag: str | None = None
        self._ignored_depth = 0

    def handle_starttag(self, tag: str, attrs) -> None:
        if tag in {"script", "style", "noscript"}:
            self._ignored_depth += 1
        if self._ignored_depth == 0 and tag in {"title", "h1", "p"}:
            self._tag = tag

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "noscript"} and self._ignored_depth:
            self._ignored_depth -= 1
        if tag == self._tag:
            self._tag = None

    def handle_data(self, data: str) -> None:
        if self._ignored_depth or self._tag is None:
            return
        text = " ".join(data.split())
        if not text:
            return
        if self._tag in {"title", "h1"} and not self.title:
            self.title = text
        elif self._tag == "p":
            self.paragraphs.append(text)


def extract_document(html: str) -> tuple[str, str]:
    parser = _DocumentParser()
    parser.feed(html)
    return parser.title, "\n\n".join(parser.paragraphs)
