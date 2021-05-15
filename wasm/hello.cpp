#include <time.h>   // for time
#include <stdlib.h> // for rand
#include <stdint.h> // for rand
#include <stdio.h>
#include <math.h>
#include <iomanip>
#include <emscripten.h>
#include <iostream>
#include "uint256_t.h"
#include <inttypes.h>
#include <chrono>

extern "C" {


	inline uint64_t rdtsc() {
			return std::chrono::high_resolution_clock::now().time_since_epoch().count();
	}
			
        void numbersIntoPixels(uint32_t*  decimalTransparentPixelGroupsInput_Ptr, int decimalTransparentPixelGroupsLength,uint32_t* decimalTransparentPixelGroupIndexesInput_Ptr,int decimalTransparentPixelGroupIndexesLength,uint32_t* decimalPixelGroupsInput_Ptr,int decimalPixelGroupsLength,uint32_t* decimalPixelGroupIndexesInput_Ptr,int decimalPixelGroupIndexesLength,uint32_t* decimalPixelDataInput_Ptr, int decimalPixelDataLength,uint32_t* decimalColorIndexInput_Ptr, int decimalColorIndexLength) {

		//calculate if system is LittleEndian or BigEndian
//		const volatile uint32_t i=0x01234567;
//		const bool isLittleEndian = ((*((uint8_t*)(&i))) == 0x67);

		//declare varibles
//		const int byteTillLastBigInt = floor((len / 8)) * 32;
//		std::cout << "byteTillLastBigInt: " << byteTillLastBigInt << std::endl;
//		const int totalBytes = len * 4;
//		std::cout << "totalBytes: " << totalBytes << std::endl;
//		const int bytesInLastRow = totalBytes - byteTillLastBigInt;
//		std::cout << "bytesInLastRow: " << bytesInLastRow << std::endl;

		//declare indexes
//		int bigEndianByteIndex;
//		int littleEndianByteIndex;
//		int bigEndianLastBytesIndex;
//		int littleEndianLastBytesIndex;
//		int littleEndianUint32Index;
		//IF BIG ENDIAN


	/*	
		if (!isLittleEndian) {
	        //slowest is 1.8 million
	//	std::cout << "we are bigEndian" << std::endl;
			//process rows up until last one
				for (bigEndianByteIndex = 0; bigEndianByteIndex < totalBytes; bigEndianByteIndex++) {
				//	std::cout << std::hex << unsigned(input_ptr[bigEndianByteIndex]) << std::endl;
				}
		//IF LITTLE ENDIAN
		} else {
	//	std::cout << "we are littleEndian" << std::endl;
			//increment by 4 bytes up till totalByes
				for (littleEndianByteIndex = 3; littleEndianByteIndex < totalBytes; littleEndianByteIndex = littleEndianByteIndex + 4) {
					for(littleEndianUint32Index = 0;littleEndianUint32Index > -4;littleEndianUint32Index--) {
						boxx[testIndex] = input_ptr[littleEndianByteIndex + littleEndianUint32Index];
						testIndex++;
					//	std::cout << std::hex << unsigned(input_ptr[littleEndianByteIndex + littleEndianUint32Index]) << std::endl;
					}
				}
		}
		*/
	//	std::cout << testIndex << std::endl;
		uint64_t tt;
		uint64_t tt2;
		uint8_t boxx[900800];
		int testIndex = 0;
	        int biitIndex;
		uint32_t chunkk;

		tt = rdtsc();

       		for (biitIndex = 0; biitIndex < decimalTransparentPixelGroupsLength; biitIndex++) {
			chunkk = decimalTransparentPixelGroupsInput_Ptr[biitIndex];
			boxx[testIndex] = (chunkk >> 24) & 255u;
			testIndex++;
			boxx[testIndex] = (chunkk >> 16) & 255u;
			testIndex++;
			boxx[testIndex] = (chunkk >> 8) & 255u;
			testIndex++;
			boxx[testIndex] = chunkk & 255u;
			testIndex++;
		}	
		std::cout << "DONE DONE DONE" << std::endl;
		std::cout << "DONE DONE DONE" << std::endl;





		testIndex = 0;
		tt = rdtsc();
		//std::cout << "decimalTransparentPixelGroupIndexes :D" << std::endl;
       		for (biitIndex = 0; biitIndex < decimalTransparentPixelGroupIndexesLength; biitIndex++) {
			chunkk = decimalTransparentPixelGroupIndexesInput_Ptr[biitIndex];
			boxx[testIndex] = (chunkk >> 24) & 255u;
			testIndex++;
			boxx[testIndex] = (chunkk >> 16) & 255u;
			testIndex++;
			boxx[testIndex] = (chunkk >> 8) & 255u;
			testIndex++;
			boxx[testIndex] = chunkk & 255u;
			testIndex++;
			/*
			std::cout << std::hex << ((chunkk >> 24) & 255u) << std::endl;
			testIndex++;
			std::cout << std::hex << ((chunkk >> 16) & 255u) << std::endl;
			testIndex++;
			std::cout << std::hex << ((chunkk >> 8) & 255u) << std::endl;
			testIndex++;
			std::cout << std::hex << (chunkk & 255u) << std::endl;
			testIndex++;
			*/
		}	
		std::cout << "DONE DONE DONE" << std::endl;
		std::cout << "DONE DONE DONE" << std::endl;

		tt2 = rdtsc();

		std::cout << "cycles: " << tt2 -tt << std::endl;

			//process rows up until last one
//			if(byteTillLastBigInt != 0 ) {
			//	for (bigEndianByteIndex = 0; bigEndianByteIndex < byteTillLastBigInt; bigEndianByteIndex++) {
			///		std::cout << std::hex << unsigned(input_ptr[bigEndianByteIndex]) << std::endl;

//				}
//			}
			//process last row
//			for (bigEndianLastBytesIndex = byteTillLastBigInt; bigEndianLastBytesIndex < totalBytes; bigEndianLastBytesIndex++) {
//				std::cout << std::hex << unsigned(input_ptr[bigEndianLastBytesIndex]) << std::endl;
				//add own 0x00 bytes to array based on % 2 calculation
				//don't add to finalArray until first non-zero byte
//			}
		//IF LITTLE ENDIAN
//		} else {
//		std::cout << "we are littleEndian" << std::endl;
			//increment by 4 bytes up till totalByes
//			if(byteTillLastBigInt != 0 ) {
//				for (littleEndianByteIndex = 3; littleEndianByteIndex < byteTillLastBigInt; littleEndianByteIndex = littleEndianByteIndex + 4) {
//					for(littleEndianUint32Index = 0;littleEndianUint32Index > -4;littleEndianUint32Index--) {
//						std::cout << std::hex << unsigned(input_ptr[littleEndianByteIndex + littleEndianUint32Index]) << std::endl;
//					}
//				}
//			}
			//process last row
//			for (littleEndianLastBytesIndex = byteTillLastBigInt + 3; littleEndianLastBytesIndex < totalBytes; littleEndianLastBytesIndex = littleEndianLastBytesIndex + 4) {
				//add own 0x00 bytes to array based on % 2 calculation
				//don't add to finalArray until first non-zero byte
//			}




		/*
		uint256_t transparentPixelGroups256[4000];
		int i;
		for(i = 0; i < len; i = i + 8) {
		    uint256_t a(uint128_t((uint64_t) input_ptr[i] << 32 | input_ptr[ i + 1],(uint64_t) input_ptr[i+2] << 32 | input_ptr[i+3]),uint128_t((uint64_t) input_ptr[i+4] << 32 | input_ptr[i+5],(uint64_t) input_ptr[i+6] << 32 | input_ptr[i+7]));
		    transparentPixelGroups256[i / 8] =  a;
		    std::cout << std::hex << transparentPixelGroups256[i / 8] << std::endl;
		    std::cout << std::setfill('0') << std::setw(64) << std::hex << transparentPixelGroups256[i / 8] << std::endl;
		    double leftzeros = floor((256 - transparentPixelGroups256[i/8].bits())/4);
		    std::cout << "number of padded 0s: " << leftzeros << std::endl;
		    }
		    std::cout << "done" << std::endl;
	*/	
		/*
		int i;
		int ix;
			int x;
			uint32_t res;
			
		for (i = 0; i < len; i++ ) {
			int d;
			
				for (ix = 0; ix < 32; ix = ix + 4) {
						res = 0U;
						for (x = 0; x < 4; x++) {
							res = (res << 8) + input_ptr[x];
						}
						uint8_t* copyres = (uint8_t) &res;
						std::cout << std::hex << *copyres << std::endl;
					for(d = 0; d < 4; d++) {
						std::cout << std::hex << unsigned(copyres[(i*32) + d]) << std::endl;	

					}
					
						input_ptr = input_ptr + 4;
				}
				
			//	std::cout << "DOOOOOOOOOOOOONE WITH ARRRAY: " << i << std::endl;	
				}
	*/	
		}

	}

