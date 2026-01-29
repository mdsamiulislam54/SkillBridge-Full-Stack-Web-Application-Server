export interface ITutorProfile {
  id: string;
  userId: string;
  name: string;
  bio: string;
  education: string;
  experienceYears: string;
  hourlyRate: number;
  teachingMode: TeachingMode;
  isAvailable: boolean;
  approvalStatus: ApprovalStatus;
  categories: string[];
  sessionDuration?: number;
  averageRating?: number;
  profileImage?: string;
  coverImage?: string;
  languages: string[];
  createdAt: Date;
  updatedAt: Date;

}
export enum TeachingMode {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  HYBRID = "HYBRID"
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}