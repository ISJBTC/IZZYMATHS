
import { google } from 'googleapis';

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
}

// You'll need to get these from the Google Cloud Console
const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const GOOGLE_REDIRECT_URI = 'YOUR_REDIRECT_URI';
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

const drive = google.drive({ version: 'v3', auth });

export const listFiles = async (folderId: string): Promise<GoogleDriveFile[]> => {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, webViewLink)',
      orderBy: 'name',
    });

    return response.data.files as GoogleDriveFile[];
  } catch (error) {
    console.error('Error listing files:', error);
    throw new Error('Failed to list files from Google Drive');
  }
};

export const getFileContent = async (fileId: string): Promise<string> => {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    });

    return response.data as string;
  } catch (error) {
    console.error('Error getting file content:', error);
    throw new Error('Failed to get file content from Google Drive');
  }
};

