interface ApiSuccessResponse<T> {
  data: T;
  success: true;
  status: number;
}

interface ApiFailureResponse {
  data: { message: string };
  success: false;
  status: number;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
// interface CookieOptions {
//   expires?: number | Date;
//   path?: string;
//   domain?: string;
//   secure?: boolean;
//   [key: string]: string | number | boolean | Date | undefined;
// }

// interface $TSFixMe {
//   [key: string]: string | number | boolean | Date | undefined;
// }
