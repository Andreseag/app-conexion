export interface NewsResponse {
  result: Result[];
  totalPage: number;
  page: number;
}

interface Result {
  news: News;
  media: Media[];
}

interface Media {
  id: number;
  type: string;
  media: string;
  reference: string;
}

export interface News {
  id: number;
  title: string;
  description: string;
  author: string;
  publicationdate: string;
  newsbody: string;
  discharges: string;
  category: string;
}