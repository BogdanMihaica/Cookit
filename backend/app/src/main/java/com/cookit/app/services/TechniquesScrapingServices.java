package com.cookit.app.services;

import com.cookit.app.models.Technique;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Service
public class TechniquesScrapingServices {
    static String url="https://letstalkfood-ck.com/definitions-techniques/";
    public Set<Technique> scrapeTechniques() {
        Set<Technique> techniques = new HashSet<>();
        try {
            Document document = Jsoup.connect(url).get();
            Element table = document.getElementsByClass("second").first();
            for(Element li:table.children())
            {
                Technique technique=new Technique();
                technique.setTitle(li.getElementsByTag("strong").first().text());
                li.getElementsByTag("strong").remove();
                String description = li.text().split("\\.")[0];
                description = description.substring(2);
                technique.setDescription(description);
                techniques.add(technique);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return techniques;
    }


}
