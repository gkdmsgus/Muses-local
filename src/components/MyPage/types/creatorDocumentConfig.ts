export type CreatorType = 'person' | 'solo' | 'corporate';

export type CreatorApiType = 'INDIVIDUAL' | 'BUSINESS' | 'CORPORATION';

export type CreatorDocType =
  | 'ID_CARD'
  | 'BANKBOOK'
  | 'BRC'
  | 'COMP_REGISTRY'
  | 'COMP_SEAL';

// 프론트 → API 타입 매핑
export const creatorTypeToApi: Record<CreatorType, CreatorApiType> = {
  person: 'INDIVIDUAL',
  solo: 'BUSINESS',
  corporate: 'CORPORATION',
};

interface DocumentConfig {
  title: string;
  files: {
    content: string;
    condition: string;
    docType: CreatorDocType;
  }[];
}

export const personConfig: DocumentConfig = {
  title: '개인 서류 제출',
  files: [
    { content: '신분증 사본', condition: '주민등록증, 운전면허증 등', docType: 'ID_CARD' },
    { content: '통장 사본', condition: '본인 명의 계좌', docType: 'BANKBOOK' },
  ],
};

export const soloConfig: DocumentConfig = {
  title: '개인사업자 서류 제출',
  files: [
    { content: '사업자등록증 사본', condition: '최근 3개월 이내', docType: 'BRC' },
    { content: '대표자 신분증', condition: '사업자등록증 대표자와 일치', docType: 'ID_CARD' },
    { content: '통장 사본', condition: '사업자 명의', docType: 'BANKBOOK' },
  ],
};

export const corporateConfig: DocumentConfig = {
  title: '법인사업자 서류 제출',
  files: [
    { content: '사업자등록증 사본', condition: '법인 사업자', docType: 'BRC' },
    { content: '법인 등기부등본', condition: '최근 3개월 이내', docType: 'COMP_REGISTRY' },
    { content: '법인 인감증명서', condition: '최근 3개월 이내', docType: 'COMP_SEAL' },
    { content: '통장 사본', condition: '법인 명의', docType: 'BANKBOOK' },
  ],
};

export const creatorDocumentConfig: Record<CreatorType, DocumentConfig> = {
  person: personConfig,
  solo: soloConfig,
  corporate: corporateConfig,
};

// 신청 생성 응답
export interface CreatorApplication {
  applicationId: number;
  creatorType: CreatorApiType;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// 제출 결과 응답
export interface CreatorSubmitResult {
  applicationId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submitted: boolean;
  required: CreatorDocType[];
  uploaded: CreatorDocType[];
  missing: CreatorDocType[];
}

// 업로드 응답
export interface UploadDocResponse {
  docId: number;
  docType: CreatorDocType;
  attachmentId: number;
  fileUrl: string;
  originalFilename: string;
  extension: string;
}
