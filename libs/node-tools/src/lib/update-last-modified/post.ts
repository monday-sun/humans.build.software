import * as fs from 'fs';
import * as yaml from 'js-yaml';

type FrontMatter = any;
type Content = string;

export class Post {
  static parse(filePath: string): Post {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const frontMatterEndIndex = fileContent.indexOf('---', 3);
    const frontMatter = yaml.load(
      fileContent.substring(4, frontMatterEndIndex)
    );
    const contentStartIndex = frontMatterEndIndex + 4;
    const content = fileContent.substring(contentStartIndex).trim();
    return new Post(filePath, frontMatter, content);
  }

  constructor(
    private filePath: string,
    private frontMatter: FrontMatter,
    private content: Content
  ) {}

  getFrontMatter(): FrontMatter {
    return this.frontMatter;
  }

  addFrontMatter(key: string, value: any): void {
    this.frontMatter[key] = value;
  }

  getContent(): Content {
    return this.content;
  }

  save(): void {
    const frontMatterString = yaml.dump(this.frontMatter);
    const fileContent = `---\n${frontMatterString}\n---\n${this.content}`;
    fs.writeFileSync(this.filePath, fileContent);
  }
}
