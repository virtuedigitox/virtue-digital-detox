# Domain Verification Guide for virtue-digital-detox.in

## Google Search Console Verification

### Your TXT Record:
```
google-site-verification=ei6n2erOF4jlT_MWrkGDJOp8BRix759gdiivAwDt8c4
```

---

## Step-by-Step Instructions:

### 1. Sign in to Your Domain Provider
Go to your domain registrar where you purchased `virtue-digital-detox.in` (e.g., GoDaddy, Namecheap, Google Domains, etc.)

### 2. Navigate to DNS Settings
- Look for "DNS Management", "DNS Settings", or "Manage DNS"
- This is usually under Domain Settings or Advanced Settings

### 3. Add TXT Record

**Common providers:**

#### **GoDaddy:**
1. Go to DNS Management
2. Click "Add" under Records
3. Select "TXT" as Type
4. Name/Host: `@` (or leave blank)
5. Value: `google-site-verification=ei6n2erOF4jlT_MWrkGDJOp8BRix759gdiivAwDt8c4`
6. TTL: Default (or 600)
7. Save

#### **Namecheap:**
1. Go to Advanced DNS
2. Click "Add New Record"
3. Type: TXT Record
4. Host: `@`
5. Value: `google-site-verification=ei6n2erOF4jlT_MWrkGDJOp8BRix759gdiivAwDt8c4`
6. TTL: Automatic
7. Save

#### **Cloudflare:**
1. Go to DNS settings
2. Click "Add record"
3. Type: TXT
4. Name: `@`
5. Content: `google-site-verification=ei6n2erOF4jlT_MWrkGDJOp8BRix759gdiivAwDt8c4`
6. TTL: Auto
7. Save

#### **Google Domains:**
1. Go to DNS settings
2. Scroll to "Custom resource records"
3. Name: `@`
4. Type: TXT
5. TTL: 1H
6. Data: `google-site-verification=ei6n2erOF4jlT_MWrkGDJOp8BRix759gdiivAwDt8c4`
7. Add

### 4. Wait for DNS Propagation
- DNS changes can take **15 minutes to 48 hours** to propagate
- Usually takes 1-2 hours in most cases
- You can check propagation at: https://dnschecker.org/

### 5. Verify in Google Search Console
- Go back to Google Search Console
- Click the "Verify" button
- If it fails, wait a few hours and try again

---

## Verification Check

You can verify the TXT record has been added by running this command in terminal:

```bash
nslookup -type=TXT virtue-digital-detox.in
```

Or use online tools:
- https://mxtoolbox.com/TXTLookup.aspx
- https://dnschecker.org/

---

## Troubleshooting

**If verification fails:**
1. Double-check the TXT record value is exactly: `google-site-verification=ei6n2erOF4jlT_MWrkGDJOp8BRix759gdiivAwDt8c4`
2. Make sure Host/Name is `@` or blank (not `www`)
3. Wait 24 hours for DNS propagation
4. Clear your browser cache
5. Try verification again

**Alternative Method:**
If DNS verification doesn't work, you can use the HTML file upload method:
1. In Google Search Console, choose "HTML file upload" method
2. Download the verification file
3. Upload it to your website root directory
4. Make sure it's accessible at: `https://virtue-digital-detox.in/google[verification-code].html`
5. Click verify

---

## Important Notes

- **Do NOT delete the TXT record** after verification - keep it permanently
- You can have multiple TXT records for the same domain
- This won't affect your website or email functionality
- The verification proves you own the domain to Google

---

## Contact Support

If you need help, contact your domain provider's support:
- GoDaddy: https://www.godaddy.com/help
- Namecheap: https://www.namecheap.com/support/
- Cloudflare: https://support.cloudflare.com/

---

**Last Updated:** December 1, 2025
