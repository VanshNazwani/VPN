// // // // // // import { v2 as cloudinary } from 'cloudinary';

// // // // // // // Configure Cloudinary
// // // // // // cloudinary.config({
// // // // // //   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// // // // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // // // });

// // // // // // export async function uploadToCloudinary(file, folder = 'courses') {
// // // // // //   try {
// // // // // //     const result = await cloudinary.uploader.upload(file, {
// // // // // //       folder: folder,
// // // // // //       resource_type: 'auto',
// // // // // //       transformation: [
// // // // // //         { width: 800, height: 600, crop: 'fill', quality: 'auto:good' }
// // // // // //       ]
// // // // // //     });

// // // // // //     return {
// // // // // //       public_id: result.public_id,
// // // // // //       url: result.secure_url,
// // // // // //       width: result.width,
// // // // // //       height: result.height,
// // // // // //     };
// // // // // //   } catch (error) {
// // // // // //     console.error('Cloudinary upload error:', error);
// // // // // //     throw error;
// // // // // //   }
// // // // // // }

// // // // // // export async function deleteFromCloudinary(publicId) {
// // // // // //   try {
// // // // // //     const result = await cloudinary.uploader.destroy(publicId);
// // // // // //     return result;
// // // // // //   } catch (error) {
// // // // // //     console.error('Cloudinary delete error:', error);
// // // // // //     throw error;
// // // // // //   }
// // // // // // }

// // // // // // export default cloudinary;

// // // // // //Required Parameter : FormData with "file" key and value should be an image file
// // // // // export default async function uploader(formData) {
// // // // //   try {
// // // // //  console.log('Starting Cloudinary upload process...');
// // // // //     const configRequest = await fetch(`/api/configuration/cloudinary`, {
// // // // //       method: "GET",
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //       },
// // // // //     });
// // // // //      console.log('Cloudinary config request status:', configRequest.status);

// // // // //     const response = await configRequest.json();

// // // // //     const data = response;

// // // // //     if (response.status === 500) {
// // // // //        console.error('Cloudinary config error:', data);
// // // // //       return { status: 500, error: data };
// // // // //     }

// // // // //     const config = data.data;
// // // // //     const imageArray = formData.getAll("file");
// // // // //     let imgLink = [];
// // // // //    console.log("Images to upload:", imageArray.length);
// // // // //     if (imageArray.length) {
// // // // //       const imgURLPromise = Promise.all(
// // // // //         imageArray.map(async (element) => {
// // // // //           try {
// // // // //              console.log('Uploading image to course_thumbnails folder...');
// // // // //             const newFormData = new FormData();
// // // // //             newFormData.append("file", element);
// // // // //             newFormData.append("upload_preset", config.uploadPreset);
// // // // //             newFormData.append("folder", "course_thumbnails");

// // // // //            console.log('Making request to Cloudinary API...');

// // // // //             const response = await fetch(
// // // // //               `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/upload`,
// // // // //               {
// // // // //                 method: "POST",
// // // // //                 body: newFormData,
// // // // //               }
// // // // //             );

// // // // //             console.log('Cloudinary API response status:', response.status);
// // // // //             const result = await response.json();

// // // // //              console.log('Cloudinary upload result:', {
// // // // //               secure_url: result.secure_url,
// // // // //               public_id: result.public_id,
// // // // //               folder: result.folder
// // // // //             });
// // // // //             return result.secure_url;
// // // // //           } catch (error) {
// // // // //              console.error('Individual image upload error:', error);
// // // // //             throw error;
// // // // //           }
// // // // //         })
// // // // //       );
// // // // //       imgLink = await imgURLPromise;
// // // // //        console.log('All images uploaded successfully:', imgLink);
// // // // //     }
// // // // //     return { status: 200, imgLinkArray: imgLink };
// // // // //   } catch (error) {
// // // // //      console.error('Cloudinary uploader error:', error);
// // // // //     return { status: 500, error };
// // // // //   }
// // // // // }

// // // // export default async function uploader(formData) {
// // // //   try {
// // // //    console.log('=== CLOUDINARY UPLOAD STARTED ===');

// // // //    console.log('Starting Cloudinary upload process...');

// // // //     const configRequest = await fetch(`/api/configuration/cloudinary`, {
// // // //       method: "GET",
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //       },
// // // //     });

// // // //    console.log('Cloudinary config request status:', configRequest.status);

// // // //     const response = await configRequest.json();
// // // //     const data = response;

// // // //     if (response.status === 500) {
// // // //      console.error('Cloudinary config error:', data);
// // // //       return { status: 500, error: data };
// // // //     }

// // // //     const config = data.data;
// // // //    console.log('Cloudinary config received:', { 
// // // //      cloudName: config.cloudinaryCloudName, 
// // // //      uploadPreset: config.uploadPreset 
// // // //    });

// // // //     const imageArray = formData.getAll("file");
// // // //     let imgLink = [];
// // // //    console.log("Images to upload:", imageArray.length);

// // // //     if (imageArray.length) {
// // // //      console.log('Starting upload process for', imageArray.length, 'images...');

// // // //       const imgURLPromise = Promise.all(
// // // //         imageArray.map(async (element) => {
// // // //           try {
// // // //            console.log('Uploading image to course_thumbnails folder...');
// // // //            console.log('Image details:', {
// // // //              name: element.name,
// // // //              size: element.size,
// // // //              type: element.type
// // // //            });

// // // //             const newFormData = new FormData();
// // // //             newFormData.append("file", element);
// // // //             newFormData.append("upload_preset", config.uploadPreset);
// // // //            newFormData.append("folder", "course_thumbnails");

// // // //            console.log('Making request to Cloudinary API...');
// // // //             const response = await fetch(
// // // //               `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/upload`,
// // // //               {
// // // //                 method: "POST",
// // // //                 body: newFormData,
// // // //               }
// // // //             );

// // // //            console.log('Cloudinary API response status:', response.status);
// // // //             const result = await response.json();
// // // //            console.log('Cloudinary upload result:', {
// // // //              secure_url: result.secure_url,
// // // //              public_id: result.public_id,
// // // //              folder: result.folder,
// // // //              created_at: result.created_at
// // // //            });

// // // //            if (!result.secure_url) {
// // // //              console.error('No secure_url in Cloudinary response:', result);
// // // //              throw new Error('Failed to get image URL from Cloudinary');
// // // //            }

// // // //             return result.secure_url;
// // // //           } catch (error) {
// // // //            console.error('Individual image upload error:', error);
// // // //             throw error;
// // // //           }
// // // //         })
// // // //       );
// // // //       imgLink = await imgURLPromise;
// // // //      console.log('=== ALL IMAGES UPLOADED SUCCESSFULLY ===');
// // // //      console.log('Uploaded URLs:', imgLink);
// // // //      console.log('All images uploaded successfully:', imgLink);
// // // //     }

// // // //     return { status: 200, imgLinkArray: imgLink };
// // // //   } catch (error) {
// // // //    console.error('=== CLOUDINARY UPLOAD ERROR ===');
// // // //    console.error('Error details:', error);
// // // //    console.error('Cloudinary uploader error:', error);
// // // //     return { status: 500, error };
// // // //   }
// // // // }

// // // export default async function uploader(formData) {
// // //   try {
// // //     console.log('=== CLOUDINARY UPLOAD STARTED ===');

// // //     console.log('Starting Cloudinary upload process...');

// // //     const configRequest = await fetch(`/api/configuration/cloudinary`, {
// // //       method: "GET",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //     });

// // //     console.log('Cloudinary config request status:', configRequest.status);

// // //     const response = await configRequest.json();
// // //     const data = response;

// // //     if (response.status === 500) {
// // //       console.error('Cloudinary config error:', data);
// // //       return { status: 500, error: data };
// // //     }

// // //     const config = data.data;
// // //     console.log('Cloudinary config received:', { 
// // //       cloudName: config.cloudinaryCloudName, 
// // //       uploadPreset: config.uploadPreset 
// // //     });

// // //     const imageArray = formData.getAll("file");
// // //     let imgLink = [];
// // //     console.log("Images to upload:", imageArray.length);

// // //     if (imageArray.length) {
// // //       console.log('Starting upload process for', imageArray.length, 'images...');

// // //       const imgURLPromise = Promise.all(
// // //         imageArray.map(async (element) => {
// // //           try {
// // //             console.log('Uploading image to course_thumbnails folder...');
// // //             console.log('Image details:', {
// // //               name: element.name,
// // //               size: element.size,
// // //               type: element.type
// // //             });

// // //             const newFormData = new FormData();
// // //             newFormData.append("file", element);
// // //             newFormData.append("upload_preset", config.uploadPreset);
// // //             newFormData.append("folder", "course_thumbnails");

// // //             console.log('Making request to Cloudinary API...');
// // //             const response = await fetch(
// // //               `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/upload`,
// // //               {
// // //                 method: "POST",
// // //                 body: newFormData,
// // //               }
// // //             );

// // //             console.log('Cloudinary API response status:', response.status);
// // //             const result = await response.json();
// // //             console.log('Cloudinary upload result:', {
// // //               secure_url: result.secure_url,
// // //               public_id: result.public_id,
// // //               folder: result.folder,
// // //               created_at: result.created_at
// // //             });

// // //             if (!result.secure_url) {
// // //               console.error('No secure_url in Cloudinary response:', result);
// // //               throw new Error('Failed to get image URL from Cloudinary');
// // //             }

// // //             return result.secure_url;
// // //           } catch (error) {
// // //             console.error('Individual image upload error:', error);
// // //             throw error;
// // //           }
// // //         })
// // //       );
// // //       imgLink = await imgURLPromise;
// // //       console.log('=== ALL IMAGES UPLOADED SUCCESSFULLY ===');
// // //       console.log('Uploaded URLs:', imgLink);
// // //       console.log('All images uploaded successfully:', imgLink);
// // //     }

// // //     return { status: 200, imgLinkArray: imgLink };
// // //   } catch (error) {
// // //     console.error('=== CLOUDINARY UPLOAD ERROR ===');
// // //     console.error('Error details:', error);
// // //     console.error('Cloudinary uploader error:', error);
// // //     return { status: 500, error };
// // //   }
// // // }

// // // Required Parameter: FormData with "file" key and value should be an image file
// // export default async function uploader(formData) {
// //   try {
// //     console.log('=== CLOUDINARY UPLOAD STARTED ===');

// //     const configRequest = await fetch(`/api/configuration/cloudinary`, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });

// //     console.log('Cloudinary config request status:', configRequest.status);

// //     const response = await configRequest.json();
// //     const data = response;

// //     if (response.status === 500) {
// //       console.error('Cloudinary config error:', data);
// //       return { status: 500, error: data };
// //     }

// //     const config = data.data;
// //     console.log('Cloudinary config received:', {
// //       cloudName: config.cloudinaryCloudName,
// //       uploadPreset: config.uploadPreset
// //     });

// //     const imageArray = formData.getAll("file");
// //     let imgLink = [];
// //     console.log("Images to upload:", imageArray.length);

// //     if (imageArray.length) {
// //       console.log('Starting upload process for', imageArray.length, 'images...');

// //       const imgURLPromise = Promise.all(
// //         imageArray.map(async (element) => {
// //           try {
// //             console.log('Uploading image:', {
// //               name: element.name,
// //               size: element.size,
// //               type: element.type
// //             });

// //             const newFormData = new FormData();
// //             newFormData.append("file", element);
// //             newFormData.append("upload_preset", config.uploadPreset);

// //             console.log('Making request to Cloudinary API...');
// //             const response = await fetch(
// //               `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/upload`,
// //               {
// //                 method: "POST",
// //                 body: newFormData,
// //               }
// //             );

// //             console.log('Cloudinary API response status:', response.status);
// //             const result = await response.json();
// //             console.log('Cloudinary upload result:', {
// //               secure_url: result.secure_url,
// //               public_id: result.public_id
// //             });

// //             if (!result.secure_url) {
// //               console.error('No secure_url in Cloudinary response:', result);
// //               throw new Error('Failed to get image URL from Cloudinary');
// //             }

// //             return result.secure_url;
// //           } catch (error) {
// //             console.error('Individual image upload error:', error);
// //             throw error;
// //           }
// //         })
// //       );

// //       imgLink = await imgURLPromise;
// //       console.log('=== ALL IMAGES UPLOADED SUCCESSFULLY ===');
// //       console.log('Uploaded URLs:', imgLink);
// //     }

// //     return { status: 200, imgLinkArray: imgLink };
// //   } catch (error) {
// //     console.error('=== CLOUDINARY UPLOAD ERROR ===');
// //     console.error('Error details:', error);
// //     return { status: 500, error };
// //   }
// // }

// // Required Parameter: FormData with "file" key and value should be an image file
// export default async function uploader(formData) {
//   try {
//     console.log('=== CLOUDINARY UPLOAD STARTED ===');

//     const configRequest = await fetch(`/api/configuration/cloudinary`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     console.log('Cloudinary config request status:', configRequest.status);

//     const response = await configRequest.json();
//     const data = response;

//     if (response.status === 500) {
//       console.error('Cloudinary config error:', data);
//       return { status: 500, error: data };
//     }

//     const config = data.data;
//     console.log('Cloudinary config received:', {
//       cloudName: config.cloudinaryCloudName,
//       uploadPreset: config.uploadPreset
//     });

//     const imageArray = formData.getAll("file");
//     let imgLink = [];
//     console.log("Images to upload:", imageArray.length);

//     if (imageArray.length) {
//       console.log('Starting upload process for', imageArray.length, 'images...');

//       const imgURLPromise = Promise.all(
//         imageArray.map(async (element) => {
//           try {
//             console.log('Uploading image:', {
//               name: element.name,
//               size: element.size,
//               type: element.type
//             });

//             const newFormData = new FormData();
//             newFormData.append("file", element);
//             newFormData.append("upload_preset", config.uploadPreset);

//             console.log('Making request to Cloudinary API...');
//             const response = await fetch(
//               `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/upload`,
//               {
//                 method: "POST",
//                 body: newFormData,
//               }
//             );

//             console.log('Cloudinary API response status:', response.status);
//             const result = await response.json();
//             console.log('Cloudinary upload result:', result);

//             if (!result.secure_url) {
//               console.error('No secure_url in Cloudinary response:', result);
//               throw new Error('Failed to get image URL from Cloudinary');
//             }

//             return result.secure_url;
//           } catch (error) {
//             console.error('Individual image upload error:', error);
//             throw error;
//           }
//         })
//       );

//       imgLink = await imgURLPromise;
//       console.log('=== ALL IMAGES UPLOADED SUCCESSFULLY ===');
//       console.log('Uploaded URLs:', imgLink);
//     }

//     return { status: 200, imgLinkArray: imgLink };
//   } catch (error) {
//     console.error('=== CLOUDINARY UPLOAD ERROR ===');
//     console.error('Error details:', error);
//     return { status: 500, error };
//   }
// }

// Required Parameter: FormData with "file" key and value should be an image file
export default async function uploader(formData) {
  try {
    console.log('=== CLOUDINARY UPLOAD STARTED ===');

    const configRequest = await fetch(`/api/configuration/cloudinary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('Cloudinary config request status:', configRequest.status);

    const response = await configRequest.json();
    const data = response;

    if (response.status === 500) {
      console.error('Cloudinary config error:', data);
      return { status: 500, error: data };
    }

    const config = data.data;
    console.log('Cloudinary config received:', {
      cloudName: config.cloudinaryCloudName,
      uploadPreset: config.uploadPreset
    });

    const imageArray = formData.getAll("file");
    let imgLink = [];
    console.log("Images to upload:", imageArray.length);

    if (imageArray.length) {
      console.log('Starting upload process for', imageArray.length, 'images...');

      const imgURLPromise = Promise.all(
        imageArray.map(async (element) => {
          try {
            console.log('Uploading image:', {
              name: element.name,
              size: element.size,
              type: element.type
            });

            const newFormData = new FormData();
            newFormData.append("file", element);
            newFormData.append("upload_preset", config.uploadPreset);

            console.log('Making request to Cloudinary API...');
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/upload`,
              {
                method: "POST",
                body: newFormData,
              }
            );

            console.log('Cloudinary API response status:', response.status);
            const result = await response.json();
            console.log('Cloudinary upload result:', result);

            if (!result.secure_url) {
              console.error('No secure_url in Cloudinary response:', result);
              throw new Error('Failed to get image URL from Cloudinary');
            }

            return result.secure_url;
          } catch (error) {
            console.error('Individual image upload error:', error);
            throw error;
          }
        })
      );

      imgLink = await imgURLPromise;
      console.log('=== ALL IMAGES UPLOADED SUCCESSFULLY ===');
      console.log('Uploaded URLs:', imgLink);
    }

    return { status: 200, imgLinkArray: imgLink };
  } catch (error) {
    console.error('=== CLOUDINARY UPLOAD ERROR ===');
    console.error('Error details:', error);
    return { status: 500, error };
  }
}