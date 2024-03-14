import mongoose,{  Schema, Document, Model } from 'mongoose';

export interface IUrl {
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  clicks?: number;
  locations?: string[];
  userId?: string;
}

interface IUrlModel extends Model<IUrl, {}, {}>, IUrl {}

const UrlSchema = new Schema<IUrl, IUrlModel>({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  locations: { type: [String], default: [] },
  userId: { type: String },
});

const Url = mongoose.model<IUrl, IUrlModel>('Url', UrlSchema);

export default Url;
