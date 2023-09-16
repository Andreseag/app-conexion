export interface NewInterface {
  news: News;
  media: Media[];
}

interface Media {
  type: string;
  media: string;
  reference: string;
}

interface News {
  title: string;
  description: string;
  author: string;
  publicationdate: string;
  newsbody: string;
  discharges: string;
}