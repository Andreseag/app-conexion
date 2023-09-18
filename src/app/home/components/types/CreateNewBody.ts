export interface CreateNewBody {
  news: News;
  media: any[];
}

interface News {
  title: string;
  description: string;
  author: string;
  publicationdate: string;
  newsbody: string;
  discharges: string;
}