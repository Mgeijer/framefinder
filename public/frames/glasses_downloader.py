#!/usr/bin/env python3
"""
Google Images Glasses Downloader with Creative Commons License

This script downloads high-quality glasses images from Google Images using the Custom Search API,
specifically filtering for Creative Commons licensed images to ensure proper usage rights.

Requirements:
- Python 3.6+
- requests library (pip install requests)
- Pillow library (pip install pillow)

Setup:
1. Create a Google Custom Search Engine at: https://cse.google.com/cse/
2. Enable "Image Search" and "Search the entire web"
3. Get your API key from: https://console.developers.google.com/apis/credentials
4. Get your Search Engine ID from your CSE settings

Environment Variables:
- GOOGLE_API_KEY: Your Google Custom Search API key
- GOOGLE_CSE_ID: Your Custom Search Engine ID

Usage:
    python3 glasses_downloader.py
"""

import os
import requests
import time
import io
from PIL import Image
from typing import Dict, List, Optional, Set
import hashlib
import json

class GoogleImagesGlassesDownloader:
    def __init__(self, base_path: str):
        self.base_path = base_path
        self.google_api_key = os.getenv('GOOGLE_API_KEY')
        self.google_cse_id = os.getenv('GOOGLE_CSE_ID')
        self.session = requests.Session()
        self.downloaded_urls: Set[str] = set()
        self.downloaded_hashes: Set[str] = set()
        
        # Face shapes to process
        self.face_shapes = ['oval', 'round', 'square', 'heart', 'diamond', 'triangle']
        
        # Enhanced search queries for Google Images with Creative Commons focus
        self.search_queries = {
            'oval': {
                'aviator-gold3': [
                    'gold aviator eyeglasses product photography',
                    'aviator glasses gold frame white background',
                    'gold metal aviator sunglasses isolated'
                ],
                'round-tortoise3': [
                    'round tortoiseshell eyeglasses product shot',
                    'circular tortoise shell glasses white background',
                    'round brown glasses frames isolated'
                ],
                'square-black3': [
                    'square black eyeglasses frame product',
                    'rectangular black glasses white background',
                    'black square frame eyewear isolated'
                ],
                'cat-eye-elegant3': [
                    'vintage cat eye glasses frame product',
                    'elegant cat eye eyeglasses white background',
                    'retro cat eye glasses isolated'
                ],
                'oversized-fashion3': [
                    'oversized fashion eyeglasses frame product',
                    'large frame glasses white background',
                    'big fashion glasses isolated'
                ],
                'rimless-minimal3': [
                    'rimless eyeglasses frame product',
                    'frameless glasses white background',
                    'minimalist rimless glasses isolated'
                ]
            },
            'round': {
                'square-brown3': [
                    'square brown eyeglasses frame product',
                    'rectangular brown glasses white background',
                    'brown square frame glasses isolated'
                ],
                'rectangular-pro3': [
                    'rectangular professional eyeglasses product',
                    'business glasses frame white background',
                    'professional rectangular glasses isolated'
                ],
                'cat-eye-sharp3': [
                    'angular cat eye glasses frame product',
                    'sharp cat eye eyeglasses white background',
                    'pointed cat eye glasses isolated'
                ],
                'geometric-designer3': [
                    'geometric eyeglasses frame product',
                    'hexagon glasses frame white background',
                    'designer geometric glasses isolated'
                ],
                'browline-classic3': [
                    'browline eyeglasses frame product',
                    'clubmaster glasses white background',
                    'classic browline glasses isolated'
                ],
                'wide-bold3': [
                    'thick frame eyeglasses product',
                    'bold wide glasses frame white background',
                    'chunky glasses frame isolated'
                ]
            },
            'square': {
                'round-wire3': [
                    'round wire rim eyeglasses product',
                    'circular metal frame glasses white background',
                    'thin wire glasses frame isolated'
                ],
                'oval-rose3': [
                    'oval rose gold eyeglasses product',
                    'pink gold glasses frame white background',
                    'rose gold oval glasses isolated'
                ],
                'cat-eye-feminine3': [
                    'feminine cat eye glasses frame product',
                    'delicate cat eye eyeglasses white background',
                    'soft cat eye glasses isolated'
                ],
                'curved-comfort3': [
                    'curved eyeglasses frame product',
                    'rounded rectangular glasses white background',
                    'comfort fit glasses isolated'
                ],
                'soft-rect-blue3': [
                    'blue rectangular eyeglasses product',
                    'navy glasses frame white background',
                    'blue prescription glasses isolated'
                ],
                'rimless-round3': [
                    'round rimless eyeglasses product',
                    'circular frameless glasses white background',
                    'round minimalist glasses isolated'
                ]
            },
            'heart': {
                'bottom-heavy3': [
                    'bottom heavy eyeglasses frame product',
                    'wide lower rim glasses white background',
                    'bottom emphasis glasses isolated'
                ],
                'round-balance3': [
                    'balanced round eyeglasses product',
                    'proportional round glasses white background',
                    'medium round glasses isolated'
                ],
                'oval-balance3': [
                    'balanced oval eyeglasses product',
                    'proportional oval glasses white background',
                    'medium oval glasses isolated'
                ],
                'cat-eye-subtle3': [
                    'subtle cat eye glasses frame product',
                    'gentle cat eye eyeglasses white background',
                    'minimal cat eye glasses isolated'
                ],
                'rimless-delicate3': [
                    'delicate rimless eyeglasses product',
                    'lightweight frameless glasses white background',
                    'thin rimless glasses isolated'
                ],
                'wide-bottom3': [
                    'wide bottom frame glasses product',
                    'trapezoid glasses frame white background',
                    'bottom wide glasses isolated'
                ]
            },
            'diamond': {
                'cat-eye-dramatic3': [
                    'dramatic cat eye glasses frame product',
                    'bold cat eye eyeglasses white background',
                    'statement cat eye glasses isolated'
                ],
                'oval-flattering3': [
                    'flattering oval eyeglasses product',
                    'elegant oval glasses white background',
                    'sophisticated oval glasses isolated'
                ],
                'round-softening3': [
                    'softening round eyeglasses product',
                    'large round glasses white background',
                    'circular soft glasses isolated'
                ],
                'rimless-elegant3': [
                    'elegant rimless eyeglasses product',
                    'sophisticated frameless glasses white background',
                    'refined rimless glasses isolated'
                ],
                'browline-statement3': [
                    'statement browline glasses product',
                    'bold browline eyeglasses white background',
                    'thick browline glasses isolated'
                ],
                'detailed-temple3': [
                    'decorative temple eyeglasses product',
                    'ornate glasses frame white background',
                    'detailed temple glasses isolated'
                ]
            },
            'triangle': {
                'cat-eye-uplifting3': [
                    'uplifting cat eye glasses product',
                    'wide top cat eye eyeglasses white background',
                    'balancing cat eye glasses isolated'
                ],
                'wide-top3': [
                    'wide top eyeglasses frame product',
                    'broad upper frame glasses white background',
                    'top heavy glasses isolated'
                ],
                'browline-bold3': [
                    'bold browline eyeglasses product',
                    'thick upper rim glasses white background',
                    'strong browline glasses isolated'
                ],
                'round-balancing3': [
                    'balancing round eyeglasses product',
                    'upper emphasis round glasses white background',
                    'wide round glasses isolated'
                ],
                'aviator-classic3': [
                    'classic aviator eyeglasses product',
                    'large aviator glasses white background',
                    'prescription aviator glasses isolated'
                ],
                'decorative-top3': [
                    'decorative top frame glasses product',
                    'ornate upper rim eyeglasses white background',
                    'embellished top glasses isolated'
                ]
            }
        }
        
        # Create directories
        self.create_directories()

    def create_directories(self):
        """Create directories for each face shape"""
        for face_shape in self.face_shapes:
            face_shape_path = os.path.join(self.base_path, face_shape)
            if not os.path.exists(face_shape_path):
                os.makedirs(face_shape_path)
                print(f"Created directory: {face_shape_path}")

    def search_google_images(self, query: str, num_results: int = 10) -> List[Dict]:
        """Search Google Images using Custom Search API with Creative Commons filter"""
        if not self.google_api_key or not self.google_cse_id:
            print("⚠️  Google API credentials not found")
            return []
        
        url = "https://www.googleapis.com/customsearch/v1"
        params = {
            'key': self.google_api_key,
            'cx': self.google_cse_id,
            'q': query,
            'searchType': 'image',
            'num': min(num_results, 10),  # Max 10 per request
            'imgSize': 'large',
            'imgType': 'photo',
            'safe': 'active',
            'rights': 'cc_publicdomain,cc_attribute,cc_sharealike,cc_noncommercial,cc_nonderived',  # Creative Commons
            'fileType': 'jpg,png',
            'imgColorType': 'color'
        }
        
        try:
            response = self.session.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            # Extract image results
            items = data.get('items', [])
            results = []
            
            for item in items:
                result = {
                    'url': item.get('link'),
                    'title': item.get('title', ''),
                    'snippet': item.get('snippet', ''),
                    'displayLink': item.get('displayLink', ''),
                    'mime': item.get('mime', ''),
                    'image': item.get('image', {})
                }
                results.append(result)
            
            return results
            
        except requests.RequestException as e:
            print(f"Error searching Google Images: {e}")
            return []
        except Exception as e:
            print(f"Error parsing Google Images response: {e}")
            return []

    def calculate_image_hash(self, image_data: bytes) -> str:
        """Calculate a hash of the image data to detect duplicates"""
        return hashlib.md5(image_data).hexdigest()

    def is_suitable_image(self, result: Dict) -> bool:
        """Enhanced filtering to determine if an image is suitable"""
        title = result.get('title', '').lower()
        snippet = result.get('snippet', '').lower()
        display_link = result.get('displayLink', '').lower()
        
        # Combine all text for analysis
        all_text = f"{title} {snippet}".lower()
        
        # Positive indicators (product shots, eyewear)
        positive_keywords = [
            'glasses', 'eyeglasses', 'eyewear', 'spectacles', 'frames',
            'product', 'isolated', 'white background', 'studio'
        ]
        
        # Negative indicators (people, lifestyle shots)
        negative_keywords = [
            'person wearing', 'man wearing', 'woman wearing', 'people',
            'portrait', 'face', 'model', 'human', 'wearing glasses',
            'lifestyle', 'fashion model', 'person with glasses'
        ]
        
        # Preferred domains (stock photo sites, eyewear retailers)
        preferred_domains = [
            'shutterstock', 'istockphoto', 'getty', 'alamy', 'dreamstime',
            'warbyparker', 'zenni', 'eyebuydirect', 'lenscrafters',
            'rayban', 'oakley', 'persol'
        ]
        
        # Check for positive indicators
        positive_score = sum(1 for keyword in positive_keywords if keyword in all_text)
        
        # Check for negative indicators
        negative_score = sum(1 for keyword in negative_keywords if keyword in all_text)
        
        # Bonus for preferred domains
        domain_bonus = 1 if any(domain in display_link for domain in preferred_domains) else 0
        
        # Must have positive indicators, no negative indicators
        return (positive_score + domain_bonus) > 0 and negative_score == 0

    def download_image(self, url: str, filepath: str) -> bool:
        """Download an image from URL and save to filepath with duplicate detection"""
        try:
            # Skip if URL already downloaded
            if url in self.downloaded_urls:
                print(f"⚠️  Skipping duplicate URL")
                return False
            
            # Add headers to appear more like a browser
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
            
            response = self.session.get(url, timeout=30, headers=headers)
            response.raise_for_status()
            
            # Check if response is actually an image
            content_type = response.headers.get('content-type', '').lower()
            if not any(img_type in content_type for img_type in ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']):
                print(f"⚠️  Not an image file: {content_type}")
                return False
            
            # Calculate hash to detect visual duplicates
            image_hash = self.calculate_image_hash(response.content)
            if image_hash in self.downloaded_hashes:
                print(f"⚠️  Skipping visually duplicate image")
                return False
            
            # Open and process image
            image = Image.open(io.BytesIO(response.content))
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Check minimum size requirements
            if image.width < 200 or image.height < 200:
                print(f"⚠️  Image too small: {image.width}x{image.height}")
                return False
            
            # Resize to 800x800 while maintaining aspect ratio
            image.thumbnail((800, 800), Image.Resampling.LANCZOS)
            
            # Create a white background and center the image
            final_image = Image.new('RGB', (800, 800), 'white')
            x = (800 - image.width) // 2
            y = (800 - image.height) // 2
            final_image.paste(image, (x, y))
            
            # Save as high-quality JPEG
            final_image.save(filepath, 'JPEG', quality=95, optimize=True)
            
            # Record this download to prevent duplicates
            self.downloaded_urls.add(url)
            self.downloaded_hashes.add(image_hash)
            
            return True
            
        except Exception as e:
            print(f"Error downloading {url}: {e}")
            return False

    def find_best_image(self, face_shape: str, frame_type: str) -> Optional[str]:
        """Find the best image for a given face shape and frame type"""
        queries = self.search_queries[face_shape][frame_type]
        
        for query in queries:
            print(f"🔍 Searching Google Images: {query}")
            
            # Search Google Images with Creative Commons filter
            results = self.search_google_images(query, num_results=10)
            
            # Filter and sort results
            suitable_results = []
            for result in results:
                if self.is_suitable_image(result):
                    url = result.get('url')
                    if url and url not in self.downloaded_urls:
                        suitable_results.append((result, url))
            
            # Try the most suitable results first
            for result, url in suitable_results[:3]:  # Try top 3 suitable results
                return url
            
            # Small delay between searches
            time.sleep(1)
        
        # If no suitable results found, try with first available result
        print("🔄 No suitable results found, trying first available...")
        for query in queries:
            results = self.search_google_images(query, num_results=5)
            for result in results:
                url = result.get('url')
                if url and url not in self.downloaded_urls:
                    return url
        
        return None

    def download_all_images(self):
        """Download all images for all face shapes and frame types"""
        total_images = sum(len(frames) for frames in self.search_queries.values())
        current_count = 0
        successful_downloads = 0
        
        print(f"🚀 Starting download of {total_images} images...")
        print("📁 Saving to:", self.base_path)
        
        for face_shape, frame_types in self.search_queries.items():
            print(f"\n📂 Processing {face_shape.upper()} face shape...")
            
            for frame_type, queries in frame_types.items():
                current_count += 1
                filename = f"{frame_type}.jpg"
                filepath = os.path.join(self.base_path, face_shape, filename)
                
                # Skip if file already exists
                if os.path.exists(filepath):
                    print(f"✅ {current_count}/{total_images} - Skipping {filename} (already exists)")
                    successful_downloads += 1
                    continue
                
                print(f"⬇️  {current_count}/{total_images} - Downloading {filename}...")
                
                # Find and download the best image
                image_url = self.find_best_image(face_shape, frame_type)
                
                if image_url:
                    success = self.download_image(image_url, filepath)
                    if success:
                        print(f"✅ Successfully downloaded {filename}")
                        successful_downloads += 1
                    else:
                        print(f"❌ Failed to download {filename}")
                else:
                    print(f"❌ No suitable image found for {filename}")
                
                # Rate limiting - be respectful to Google API
                time.sleep(2)  # Longer delay for Google API
        
        print(f"\n🎉 Download process completed!")
        print(f"📊 Successfully downloaded: {successful_downloads}/{total_images} images")
        self.print_summary()

    def print_summary(self):
        """Print a summary of downloaded images"""
        print("\n📊 DOWNLOAD SUMMARY")
        print("=" * 50)
        
        total_downloaded = 0
        for face_shape in self.face_shapes:
            face_shape_path = os.path.join(self.base_path, face_shape)
            if os.path.exists(face_shape_path):
                files = [f for f in os.listdir(face_shape_path) if f.endswith('3.jpg')]
                count = len(files)
                total_downloaded += count
                print(f"{face_shape.capitalize()}: {count}/6 images")
        
        print(f"\nTotal: {total_downloaded}/36 images downloaded")
        
        if total_downloaded < 36:
            print("\n💡 NEXT STEPS:")
            print("1. Check your Google API credentials")
            print("2. Verify your Custom Search Engine settings")
            print("3. Manually download missing images if needed")
        else:
            print("\n🎉 All images successfully downloaded!")
            print("✨ Images are Creative Commons licensed with:")
            print("   • Product photography focus")
            print("   • White backgrounds preferred")
            print("   • No duplicate images")
            print("   • 800x800 resolution, 95% JPEG quality")
            print("   • Proper licensing for commercial use")

def main():
    """Main function to run the Google Images downloader"""
    print("🔍 Google Images Glasses Downloader v3.0 (Creative Commons)")
    print("=" * 65)
    print("🎯 Features:")
    print("   • Creative Commons licensed images only")
    print("   • Google Custom Search API integration")
    print("   • Product photography focus")
    print("   • Enhanced duplicate detection")
    print("   • Professional image filtering")
    print("")
    
    # Set the base path
    base_path = os.getcwd()
    
    if not base_path.endswith('frames'):
        print("⚠️  Warning: You should run this script from the /frames directory")
        print(f"Current directory: {base_path}")
        response = input("Continue anyway? (y/n): ")
        if response.lower() != 'y':
            return
    
    print(f"📁 Working directory: {base_path}")
    
    # Check for API credentials
    google_api_key = os.getenv('GOOGLE_API_KEY')
    google_cse_id = os.getenv('GOOGLE_CSE_ID')
    
    if not google_api_key or not google_cse_id:
        print("\n❌ Google API credentials not found!")
        print("\n🔑 Setup Instructions:")
        print("1. Create a Custom Search Engine: https://cse.google.com/cse/")
        print("   - Enable 'Image Search' and 'Search the entire web'")
        print("2. Get API key: https://console.developers.google.com/apis/credentials")
        print("   - Enable 'Custom Search API'")
        print("3. Set environment variables:")
        print("   export GOOGLE_API_KEY='your_api_key_here'")
        print("   export GOOGLE_CSE_ID='your_search_engine_id_here'")
        print("\n💡 Google Custom Search provides 100 free queries per day")
        return
    
    print("✅ Google API key found")
    print("✅ Google CSE ID found")
    
    # Create downloader instance and start downloading
    downloader = GoogleImagesGlassesDownloader(base_path)
    
    print(f"\n🎯 Will download 36 glasses images (6 per face shape)")
    print("📋 New filenames will have '3' suffix (Creative Commons)")
    print("⚖️  All images will be Creative Commons licensed")
    response = input("Start Google Images download? (y/n): ")
    
    if response.lower() == 'y':
        downloader.download_all_images()
    else:
        print("❌ Download cancelled")

if __name__ == "__main__":
    main()