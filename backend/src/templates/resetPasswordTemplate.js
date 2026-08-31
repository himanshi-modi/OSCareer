const passwordResetTemplate = (resetUrl) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Reset your Career OS password</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #070A18;
    font-family: Arial, Helvetica, sans-serif;
    color: #E2E8F0;
">

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #070A18; padding: 40px 20px;"
    >
        <tr>
            <td align="center">

                <!-- Main Container -->
                <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                        max-width: 560px;
                        background-color: #0C1024;
                        border: 1px solid #24294A;
                        border-radius: 16px;
                        overflow: hidden;
                    "
                >

                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 40px 20px 40px;">

                            <div style="
                                font-size: 22px;
                                font-weight: bold;
                                color: #FFFFFF;
                                letter-spacing: -0.5px;
                            ">
                                Career<span style="color: #536DCE;"> OS</span>
                            </div>

                        </td>
                    </tr>


                    <!-- Content -->
                    <tr>
                        <td style="padding: 20px 40px 40px 40px;">

                            <div style="
                                display: inline-block;
                                padding: 6px 12px;
                                background-color: #111631;
                                border-radius: 20px;
                                color: #7C8FE8;
                                font-size: 12px;
                                font-weight: 600;
                                letter-spacing: 0.5px;
                            ">
                                PASSWORD RESET
                            </div>

                            <h1 style="
                                margin: 22px 0 12px 0;
                                font-size: 30px;
                                line-height: 1.25;
                                color: #FFFFFF;
                                letter-spacing: -0.5px;
                            ">
                                Reset your password
                            </h1>

                            <p style="
                                margin: 0 0 20px 0;
                                font-size: 15px;
                                line-height: 1.7;
                                color: #94A3B8;
                            ">
                                We received a request to reset the password
                                for your Career OS account.
                            </p>

                            <p style="
                                margin: 0 0 28px 0;
                                font-size: 15px;
                                line-height: 1.7;
                                color: #94A3B8;
                            ">
                                Click the button below to choose a new password
                                and get back to your career journey.
                            </p>


                            <!-- Reset Button -->
                            <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                            >
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            border-radius: 10px;
                                            background-color: #536DCE;
                                        "
                                    >
                                        <a
                                            href="${resetUrl}"
                                            style="
                                                display: inline-block;
                                                padding: 14px 28px;
                                                font-size: 14px;
                                                font-weight: 600;
                                                color: #FFFFFF;
                                                text-decoration: none;
                                                border-radius: 10px;
                                            "
                                        >
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>


                            <!-- Expiry Notice -->
                            <div style="
                                margin-top: 30px;
                                padding: 16px;
                                background-color: #111631;
                                border: 1px solid #24294A;
                                border-radius: 10px;
                            ">
                                <p style="
                                    margin: 0;
                                    font-size: 13px;
                                    line-height: 1.6;
                                    color: #94A3B8;
                                ">
                                    <strong style="color: #E2E8F0;">
                                        This link expires in 15 minutes.
                                    </strong>
                                    For your security, please reset your
                                    password before the link expires.
                                </p>
                            </div>


                            <!-- Security Notice -->
                            <p style="
                                margin: 28px 0 0 0;
                                font-size: 13px;
                                line-height: 1.7;
                                color: #64748B;
                            ">
                                If you didn't request a password reset,
                                you can safely ignore this email. Your
                                password will remain unchanged.
                            </p>


                            <!-- Fallback URL -->
                            <p style="
                                margin: 24px 0 8px 0;
                                font-size: 12px;
                                color: #64748B;
                            ">
                                If the button doesn't work, copy and paste
                                the following link into your browser:
                            </p>

                            <p style="
                                margin: 0;
                                font-size: 11px;
                                line-height: 1.6;
                                word-break: break-all;
                            ">
                                <a
                                    href="${resetUrl}"
                                    style="
                                        color: #536DCE;
                                        text-decoration: none;
                                    "
                                >
                                    ${resetUrl}
                                </a>
                            </p>

                        </td>
                    </tr>


                    <!-- Footer -->
                    <tr>
                        <td
                            style="
                                padding: 24px 40px;
                                border-top: 1px solid #24294A;
                                background-color: #0A0E20;
                            "
                        >

                            <p style="
                                margin: 0;
                                font-size: 12px;
                                line-height: 1.6;
                                color: #475569;
                                text-align: center;
                            ">
                                You're receiving this email because a password
                                reset was requested for your Career OS account.
                            </p>

                            <p style="
                                margin: 10px 0 0 0;
                                font-size: 12px;
                                color: #334155;
                                text-align: center;
                            ">
                                © Career OS
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
    `;
};

module.exports = passwordResetTemplate;