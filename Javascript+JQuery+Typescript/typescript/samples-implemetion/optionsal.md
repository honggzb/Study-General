
```typescript
interface Article {
  tilte: string; 
  content: string; 
  author: string; 
  date: Date;
  readCount: number;
}

type Options<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type CreateArticleOptions = Options<Article, 'author' | 'date | 'readCount'>;
function createArticle(options: CreateArticleOptions) {}
```
