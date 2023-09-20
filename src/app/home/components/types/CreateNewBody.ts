export interface CreateNewBody {
  news: News;
  media: Media[];
}

interface News {
  title: string;
  description: string;
  author: string;
  publicationdate: string;
  newsbody: string;
  discharges: string;
}

export interface Media {
  type: string;
  media: string;
  reference: string
}