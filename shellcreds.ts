import { Session } from "@noovolari/leapp-core/models/session";
import { AwsCredentialsPlugin } from "@noovolari/leapp-core/plugin-sdk/aws-credentials-plugin";
import clipboard from 'clipboardy';

export class ShellCredentialsPlugin extends AwsCredentialsPlugin {
  get actionName(): string {
    return "Copy credentials for Shell";
  }

  /*
   * Get your icon here: 
   * https://fontawesome.com/v5/search
   */
  get actionIcon(): string {
    return "fas fa-terminal";
  }

  /*
   * @params
   * session       Session            my session object (https://github.com/Noovolari/leapp/blob/master/packages/core/src/models/session.ts)
   * credentials   Credential-Info    my credentials object (https://github.com/Noovolari/leapp/blob/master/packages/core/src/models/credentials-info.ts)
   */
  async applySessionAction(session: Session, credentials: any): Promise<void> {
    let text = '';
    text += `export AWS_ACCESS_KEY_ID=${credentials.sessionToken.aws_access_key_id}\n`;
    text += `export AWS_SECRET_ACCESS_KEY=${credentials.sessionToken.aws_secret_access_key}\n`;
    text += `export AWS_SESSION_TOKEN=${credentials.sessionToken.aws_session_token}\n`;
    if (credentials.sessionToken.region) {
      text += `export AWS_REGION=${credentials.sessionToken.region}\n`;
      text += `export AWS_DEFAULT_REGION=${credentials.sessionToken.region}\n`;
    }

    clipboard.writeSync(text);
  }
}
