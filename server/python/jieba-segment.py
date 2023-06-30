import jieba
import sys
sys.stdout.reconfigure(encoding='utf-8')

textToBeSegmented = sys.argv[1]



seg_list = jieba.cut(textToBeSegmented, cut_all=True)
result = " ".join(seg_list)
print(result) # 全模式