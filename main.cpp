#define CURL_STATICLIB
#include "curl/curl.h"
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <list>
#include <algorithm>

using namespace std;

#ifdef _DEBUG
#	pragma comment (lib, "curl/libcurl_a_debug.lib")
#else
#	pragma comment (lib, "curl/libcurl_a.lib")
#endif

static int writer(char *data, size_t size, size_t nmemb, std::string *writerData)
{
	if (writerData == NULL)
		return 0;

	writerData->append(data, size*nmemb);

	return size * nmemb;
}

static size_t WriteCallback(void *contents, size_t size, size_t nmemb, void *userp)
{
	((std::string*)userp)->append((char*)contents, size * nmemb);
	return size * nmemb;
}

int main()
{
	setlocale(LC_ALL, "Russian");
	//SetConsoleOutputCP(866);
	SetConsoleCP(1251);
	SetConsoleOutputCP(1251);

	string name = "sites.txt";
	ifstream file(name);

	ofstream myfile;
	myfile.open("output.csv");

	string line;
	list<string> sites;

	if (file.is_open())
	{
		while (getline(file, line))
		{
			stringstream stream(line);
			string value;
			while (getline(stream, value))
			{
				sites.push_back(value);
				//cout << value << endl;
			}
		}
	}
	else cout << "Unable to open file";

	string content;
	list<string> contents;

	curl_global_init(CURL_GLOBAL_ALL);
	//CURL *curl = nullptr;
	//curl = curl_easy_init();

	for (list<string>::iterator it = sites.begin(); it != sites.end(); it++)
	{
		cout << "Parsing: " << *it << "..." << endl;

		CURL *curl = nullptr;
		curl = curl_easy_init();
		curl_easy_setopt(curl, CURLOPT_URL, *it);
		curl_easy_setopt(curl, CURLOPT_WRITEDATA, &content);
		curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writer);
		CURLcode code = curl_easy_perform(curl);
		curl_easy_cleanup(curl);
	}

	string delimiter_name = "rel=\"nofollow\" itemprop=\"name\">";
	string delimiter_name2 = "</a>";
	string delimiter_phone = "class=\"show-tel\" rel=\"nofollow\">";
	string delimiter_phone2 = "</a>";
	string token_name = content, token_name2, token_phone = content, token_phone2;

	for (list<string>::iterator it = sites.begin(); it != sites.end(); it++)
	{
		token_name = token_name.substr(token_name.find(delimiter_name)+31);
		token_name2 = token_name.substr(0, token_name.find(delimiter_name2));
		token_name = token_name.substr(1, token_name.length());

		token_phone = token_phone.substr(token_phone.find(delimiter_phone)+32);
		token_phone = token_phone.substr(token_phone.find(delimiter_phone) + 32);
		token_phone2 = token_phone.substr(0, token_phone.find(delimiter_phone2));
		token_phone = token_phone.substr(1, token_phone.length());

		token_name2.erase(remove(token_name2.begin(), token_name2.end(), ' '), token_name2.end());
		token_phone2.erase(remove(token_phone2.begin(), token_phone2.end(), ' '), token_phone2.end());

		myfile << token_name2 << ";" << token_phone2 << endl;
	}



	curl_global_cleanup();
	myfile.close();

	return 0;
}