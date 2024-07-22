# Translate-FA

This project provides two scripts for translating English subtitles to Persian using different APIs.

## Scripts

1. **translate_google_api.js**: Uses Google Translate API to translate English subtitles to Persian.
2. **translate_other_api.js**: Uses an alternative API for translation.

## Prerequisites

- Node.js installed
- API keys for the translation services

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/latifii/translate-fa.git
   cd translate-fa
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

### Google Translate API

1. Set up your Google API key in the environment variable:

   ```sh
   export GOOGLE_API_KEY='your_google_api_key'
   ```

2. Run the script:
   ```sh
   node translate_google_api.js input.srt output_google.srt
   ```

### Other Translation API

1. Set up your API key in the environment variable:

   ```sh
   export OTHER_API_KEY='your_other_api_key'
   ```

2. Run the script:
   ```sh
   node translate_other_api.js input.srt output_other.srt
   ```

## Contributing

Feel free to submit issues and pull requests for new features and improvements.

## License

This project is licensed under the MIT License.
